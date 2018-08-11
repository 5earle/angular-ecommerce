package com.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component // bean at auto scan time
public class SecurityUtility {
    private static  final String SALT = "asdfasdf&*89q7w3rkjxcvkjasf";

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12,new SecureRandom(SALT.getBytes()));
    }

    @Bean
    public static String randomPassword(){
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random random = new Random();

        while(salt.length() < 18){
            int idx = (int)(random.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(idx));
        }
        String saltString = salt.toString();
        return saltString;
    }
}
