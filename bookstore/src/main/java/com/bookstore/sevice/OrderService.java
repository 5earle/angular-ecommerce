package com.bookstore.sevice;

import com.bookstore.domain.*;

public interface OrderService {
    Order createOrder(
            ShoppingCart shoppingCart,
            ShippingAddress shippingAddress,
            BillingAddress billingAddress,
            Payment payment,
            String shippingMethod,
            User user
    );
}
