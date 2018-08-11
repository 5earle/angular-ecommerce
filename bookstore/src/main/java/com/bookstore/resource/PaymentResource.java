package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.sevice.UserPaymentService;
import com.bookstore.sevice.userServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentResource {

    @Autowired
    private userServices userService;

    @Autowired
    private UserPaymentService userPaymentService;

    @RequestMapping(value="/add", method=RequestMethod.POST)
    public Map<String,String> addNewCreditCardPost (
            @RequestBody UserPayment userPayment,
            Principal principal) {
        String name = new UserResource().passUserAround().getUsername();
        System.out.println("$$$ " + name);


        User user = userService.findByUsername(name);

        UserBilling userBilling = userPayment.getUserBilling();

        userService.updateUserBilling(userBilling, userPayment, user);

        return Collections.singletonMap("ok","Payment Added(Updated) Successfully!");
        //return new ResponseEntity("Payment Added(Updated) Successfully!", HttpStatus.OK);
        // ResponseEntity return err,but data still pass to database
    }

    @RequestMapping(value="/remove", method=RequestMethod.POST)
    public Map<String,String> removePaymentPost(@RequestBody String id,Principal principal){
        userPaymentService.removeById(Long.valueOf(id));

        return Collections.singletonMap("ok","Payment Removed Successfully!");
       // return new ResponseEntity("Payment Removed Successfully!", HttpStatus.OK);
    }

    @RequestMapping(value="/setDefault", method=RequestMethod.POST)
    public Map<String,String> setDefaultPaymentPost(@RequestBody String id, Principal principal){
        String name = new UserResource().passUserAround().getUsername();
        User user = userService.findByUsername(name);
        userService.setUserDefaultPayment(Long.parseLong(id), user);

        //return new ResponseEntity("Payment Removed Successfully!", HttpStatus.OK);
        return Collections.singletonMap("ok","Payment Deafult set Successfully!");
    }

    @RequestMapping("/getUserPaymentList")
    public List<UserPayment> getUserPaymentList(Principal principal){
        String name = new LoginResource().getName();
        User user = userService.findByUsername(name);

        List<UserPayment> userPaymentList = user.getUserPaymentList();

        return userPaymentList;
    }
}
