package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class ShoppingCart implements Serializable {
    private static final long serialVersionUID = -891273432L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private BigDecimal GrandTotal;

    // one shopping cart can have many cartItem
    @OneToMany(mappedBy = "shoppingCart", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JsonIgnore
    private List<CartItem> cartItemList;

    // one shopping cart can belong to one user
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getGrandTotal() {
        return GrandTotal;
    }

    public void setGrandTotal(BigDecimal grandTotal) {
        GrandTotal = grandTotal;
    }

    public List<CartItem> getCartItemList() {
        return cartItemList;
    }

    public void setCartItemList(List<CartItem> cartItemList) {
        this.cartItemList = cartItemList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
