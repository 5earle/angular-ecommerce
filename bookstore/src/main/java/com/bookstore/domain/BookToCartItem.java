package com.bookstore.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class BookToCartItem implements Serializable {
    private static final long serialVersionUID = 879172834L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // many booktocartItem can belong to one book
    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;

    // many booktocartItem  can belong to one cartItem
    @ManyToOne
    @JoinColumn(name="cart_item_id")
    private CartItem cartItem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }
}
