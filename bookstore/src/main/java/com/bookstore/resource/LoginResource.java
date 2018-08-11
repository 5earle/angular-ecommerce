package com.bookstore.resource;

import com.bookstore.sevice.userServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
public class LoginResource {
    @Autowired
    private userServices us;
    static String name;

    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session, HttpServletRequest request){
        System.out.println("***"+request.getRemoteHost());
        System.out.println(request.getRemoteUser());
        name = request.getRemoteUser();


        String remoteHost = request.getRemoteHost();
        int prtNum = request.getRemotePort();

        System.out.println("***"+remoteHost+":"+prtNum);

        // return a imutable map aka unchanging map
        return Collections.singletonMap("token",session.getId());
    }

    @RequestMapping("/checkSession")
    public ResponseEntity checkSession(){
        return new ResponseEntity("Session Active",HttpStatus.OK);
    }

    // logout
    @RequestMapping(value="/user/logout", method=RequestMethod.POST)
    public ResponseEntity logout(){
        SecurityContextHolder.clearContext();
        return new ResponseEntity("Logout Successfully!", HttpStatus.OK);
    }

    public String getName(){
        return name;
    }
}
