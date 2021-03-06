package com.bookstore.sevice.impl;

import com.bookstore.domain.*;
import com.bookstore.domain.security.UserRole;
import com.bookstore.repository.*;
import com.bookstore.sevice.userServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class userServicesImp implements userServices {
    private static final Logger LOG = LoggerFactory.getLogger(userServices.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private roleRepository roleRepository;

    @Autowired
    private UserBillingRepository userBillingRepository;

    @Autowired
    private UserPaymentRepository userPaymentRepository;

    @Autowired
    private UserShippingRepository userShippingRepository;


    @Transactional  // handle multiple database transaction
    public User createUser(User user, Set<UserRole> userRoles) {
        User localUsr = userRepository.findByUsername(user.getUsername());

        if(localUsr != null){
            LOG.info("***User with username {} already exist. Nothing will be done. ***", user.getUsername());
        } else {
            for(UserRole ur: userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            user.setShoppingCart(shoppingCart);

            user.setUserPaymentList(new ArrayList<UserPayment>());
            user.setUserShippingList(new ArrayList<UserShipping>());
            localUsr = userRepository.save(user);
        }
        return localUsr;
    }

    @Override
    public User findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user) {
        save(user);
        userBillingRepository.save(userBilling);
        userPaymentRepository.save(userPayment);
    }

    @Override
    public void updateUserBilling(UserBilling userBilling, UserPayment userPayment, User user) {
        userPayment.setUser(user);
        userPayment.setUserBilling(userBilling);
        userPayment.setDefaultPayment(true);
        userBilling.setUserPayment(userPayment);
        user.getUserPaymentList().add(userPayment);
        save(user);
    }

    @Override
    public void setUserDefaultPayment(Long userPaymentId, User user) {
        System.out.println(userPaymentId);
        List<UserPayment> userPaymentList = (List<UserPayment>) userPaymentRepository.findAll();

        for (UserPayment userPayment : userPaymentList) {
            if(userPayment.getId().equals(userPaymentId)) {
                userPayment.setDefaultPayment(true);
                userPaymentRepository.save(userPayment);
                break;
            } else {
                userPayment.setDefaultPayment(false);
                userPaymentRepository.save(userPayment);
            }
        }
    }

    @Override
    public void updateUserShipping(UserShipping userShipping, User user) {
        userShipping.setUser(user);
        userShipping.setUserShippingDefault(true);
        user.getUserShippingList().add(userShipping);
        save(user);
    }

    @Override
    public void setUserDefaultShipping(Long userShippingId, User user) {
        List<UserShipping> userShippingList = (List<UserShipping>) userShippingRepository.findAll();

        for (UserShipping userShipping : userShippingList) {
            if(userShipping.getId().equals(userShippingId)) {
                userShipping.setUserShippingDefault(true);
                userShippingRepository.save(userShipping);
            } else {
                userShipping.setUserShippingDefault(false);
                userShippingRepository.save(userShipping);
            }
        }
    }
}
