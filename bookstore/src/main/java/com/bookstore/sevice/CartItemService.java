package com.bookstore.sevice;

import com.bookstore.domain.Book;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;

import java.util.List;
import java.util.Optional;

public interface CartItemService {
    CartItem addBookToCartItem(Book book, User user, int qty);
    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);
    CartItem updateCartItem(CartItem cartItem);
    void removeCartItem(CartItem cartItem);
    Optional<CartItem> findById(Long id);
    CartItem save(CartItem cartItem);
}
