package com.bookstore.sevice.impl;

import com.bookstore.domain.UserShipping;
import com.bookstore.repository.UserShippingRepository;
import com.bookstore.sevice.UserShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserShippingServiceImpl implements UserShippingService {
    @Autowired
    private UserShippingRepository userShippingRepository;

    @Override
    public Optional<UserShipping> findById(Long id) {
        return userShippingRepository.findById(id);
    }

    @Override
    public void removeById(Long id) {
        userShippingRepository.deleteById(id);
    }
}
