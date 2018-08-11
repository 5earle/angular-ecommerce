package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserShipping;
import com.bookstore.sevice.UserShippingService;
import com.bookstore.sevice.userServices;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/shipping")
public class ShippingResource {

    @Autowired
    private userServices userService;

    @Autowired
    private UserShippingService userShippingService;

    @RequestMapping(value="/add", method= RequestMethod.POST)
    public Map<String,String> addNewUserShippingPost(@RequestBody UserShipping userShipping, Principal principal
    ) {
        String name = new UserResource().passUserAround().getUsername();
        User user = userService.findByUsername(name);
        userService.updateUserShipping(userShipping, user);

        return Collections.singletonMap("ok","Shipping Added(Updated) Successfully!");
    }

    @RequestMapping("/getUserShippingList")
    public List<UserShipping> getUserShippingList(Principal principal){
        String name = new LoginResource().getName();
        User user = userService.findByUsername(name);
        List<UserShipping> userShippingList = user.getUserShippingList();
        return userShippingList;
    }

    @RequestMapping(value="/remove", method=RequestMethod.POST)
    public Map<String,String> removeUserShippingPost(@RequestBody String id, Principal principal) {
        userShippingService.removeById(Long.parseLong(id));
        return Collections.singletonMap("ok","Shipping Removed Successfully!");
    }

    @RequestMapping(value="/setDefault", method=RequestMethod.POST)
    public Map<String,String> setDefaultUserShippingPost(@RequestBody String id, Principal principal){
        String name = new UserResource().passUserAround().getUsername();
        User user = userService.findByUsername(name);
        userService.setUserDefaultShipping(Long.parseLong(id), user);

        return Collections.singletonMap("ok","Set Default Shipping Successfully!");
    }
}
