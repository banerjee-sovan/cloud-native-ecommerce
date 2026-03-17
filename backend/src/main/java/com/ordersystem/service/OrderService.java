package com.ordersystem.service;

import com.ordersystem.dto.OrderRequest;
import com.ordersystem.dto.OrderResponse;
import com.ordersystem.entity.Order;
import com.ordersystem.entity.OrderItem;
import com.ordersystem.entity.Product;
import com.ordersystem.entity.User;
import com.ordersystem.repository.OrderItemRepository;
import com.ordersystem.repository.OrderRepository;
import com.ordersystem.repository.ProductRepository;
import com.ordersystem.repository.UserRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Order savedOrder = createOrder(request.getUserId(), request.getItems().stream()
                .map(item -> new OrderLineRequest(item.getProductId(), item.getQuantity()))
                .toList());
        return toResponse(savedOrder);
    }

    @Transactional
    public Order createOrder(Long userId, List<OrderLineRequest> items) {
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(Order.OrderStatus.CREATED);
        order.setCreatedAt(Instant.now());
        order.setTotalPrice(BigDecimal.ZERO);

        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderLineRequest item : items) {
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(() -> new NoSuchElementException("Product not found with id: " + item.productId()));

            if (item.quantity() == null || item.quantity() <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than zero");
            }

            if (product.getStock() < item.quantity()) {
                throw new IllegalStateException("Insufficient stock for product id: " + product.getId());
            }

            product.setStock(product.getStock() - item.quantity());

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setPrice(product.getPrice());
            orderItems.add(orderItem);
        }

        List<OrderItem> savedItems = orderItemRepository.saveAll(orderItems);
        BigDecimal totalPrice = calculateTotalPrice(savedItems);

        savedOrder.setOrderItems(savedItems);
        savedOrder.setTotalPrice(totalPrice);

        return orderRepository.save(savedOrder);
    }

    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Order not found with id: " + orderId));
        order.getUser().getId();
        order.getOrderItems().forEach(item -> item.getProduct().getId());
        return toResponse(order);
    }

    public BigDecimal calculateTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getStatus().name(),
                order.getTotalPrice(),
                order.getCreatedAt(),
                order.getOrderItems().stream()
                        .map(this::toItemResponse)
                        .toList()
        );
    }

    private OrderResponse.OrderItemDto toItemResponse(OrderItem orderItem) {
        return new OrderResponse.OrderItemDto(
                orderItem.getId(),
                orderItem.getProduct().getId(),
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }

    public record OrderLineRequest(Long productId, Integer quantity) {
    }
}
