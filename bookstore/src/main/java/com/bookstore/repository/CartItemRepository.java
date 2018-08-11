package com.bookstore.repository;

import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;
@Transactional
public interface CartItemRepository extends CrudRepository<CartItem,Long> {
    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);
}
