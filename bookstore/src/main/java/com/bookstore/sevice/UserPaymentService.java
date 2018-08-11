package com.bookstore.sevice;

import com.bookstore.domain.UserPayment;

import java.util.Optional;

public interface UserPaymentService {
    Optional<UserPayment> findById(Long id);
    void removeById(Long id);
}
