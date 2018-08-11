package com.bookstore.sevice;

import com.bookstore.domain.UserShipping;

import java.util.Optional;

public interface UserShippingService {
    Optional<UserShipping> findById(Long id);
    void removeById(Long id);
}
