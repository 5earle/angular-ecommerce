package com.bookstore.resource;

import com.bookstore.domain.*;
import com.bookstore.sevice.CartItemService;
import com.bookstore.sevice.OrderService;
import com.bookstore.sevice.ShoppingCartService;
import com.bookstore.sevice.userServices;
import com.bookstore.utility.MailConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/checkout")
public class CheckoutResource {
    private Order order = new Order();

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private userServices userService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @RequestMapping(value = "/checkout", method= RequestMethod.POST)
    public Order checkoutPost(@RequestBody HashMap<String, Object> mapper, Principal principal){
        // provides functionality for converting between Java objects
        ObjectMapper om = new ObjectMapper();

        ShippingAddress shippingAddress = om.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);
        BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);
        Payment payment = om.convertValue(mapper.get("payment"), Payment.class);
        String shippingMethod = (String) mapper.get("shippingMethod");

        ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        User user = userService.findByUsername(principal.getName());
        Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, payment, shippingMethod, user);

        // fix this if possible
        SimpleMailMessage email = mailConstructor.contructNewUserEmail(user, order.toString());
        mailSender.send(email);

        shoppingCartService.clearShoppingCart(shoppingCart);

        LocalDate today = LocalDate.now();
        LocalDate estimatedDeliveryDate;
        if (shippingMethod.equals("groundShipping")) {
            estimatedDeliveryDate=today.plusDays(5);
        } else {
            estimatedDeliveryDate=today.plusDays(3);
        }

        this.order = order;

        return order;
    }
}
