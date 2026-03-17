package com.ordersystem.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private Long userId;
    private String status;
    private BigDecimal totalPrice;
    private Instant createdAt;
    private List<OrderItemDto> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDto {

        private Long id;
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }
}
