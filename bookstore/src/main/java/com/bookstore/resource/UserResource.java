package com.bookstore.resource;
import com.bookstore.config.SecurityConfig;
import com.bookstore.config.SecurityUtility;
import com.bookstore.domain.User;
import com.bookstore.domain.security.Role;
import com.bookstore.domain.security.UserRole;
import com.bookstore.sevice.userServices;
import com.bookstore.utility.MailConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.SendFailedException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private userServices userService;

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    public static User user;


    @RequestMapping(value = "/newUser", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity newUserPost(HttpServletRequest request, @RequestBody HashMap<String, String> mapper)
            throws SendFailedException {
        String username = mapper.get("username");
        String userEmail = mapper.get("email");

        System.out.println(username + "****" + userEmail);

        if (userService.findByUsername(username) != null) {
            return new ResponseEntity("usernameExists", HttpStatus.BAD_REQUEST);
        }

        if (userService.findByEmail(userEmail) != null) {
            return new ResponseEntity("emailExists", HttpStatus.BAD_REQUEST);
        } else {
            User user = new User();
            user.setUsername(username);
            user.setEmail(userEmail);

            String password = SecurityUtility.randomPassword();

            String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
            user.setPassword(encryptedPassword);

            Role role = new Role();
            role.setRoleId(1);
            role.setName("ROLE_USER");
            Set<UserRole> userRoles = new HashSet<>();
            userRoles.add(new UserRole(user, role));
            userService.createUser(user, userRoles);

            SimpleMailMessage email = mailConstructor.contructNewUserEmail(user, password);
            mailSender.send(email);

           /* return  ResponseEntity.ok("User Added Successfully!");*/
           return new ResponseEntity("User Added Successfully!",HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    public ResponseEntity forgetPasswordPost(HttpServletRequest request, @RequestBody HashMap<String, String> mapper)
            throws Exception {
        User user = userService.findByEmail(mapper.get("email"));

        if(user == null) {
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);
        userService.save(user);

        SimpleMailMessage email = mailConstructor.contructNewUserEmail(user, password);
        mailSender.send(email);

        return new ResponseEntity("Email sent!", HttpStatus.OK);
    }

    @RequestMapping(value="/updateUserInfo", method=RequestMethod.POST)
    public ResponseEntity profileInfo(@RequestBody HashMap<String, Object> mapper) throws Exception {

        int id = (Integer) mapper.get("id");
        String email = (String) mapper.get("email");
        String username = (String) mapper.get("username");
        String firstName = (String) mapper.get("firstName");
        String lastName = (String) mapper.get("lastName");
        String newPassword = (String) mapper.get("newPassword");
        String currentPassword = (String) mapper.get("currentPassword");

        Optional<User> currentUser = userService.findById(Long.valueOf(id));

        if(currentUser == null) {
            throw new Exception ("User not found");
        }
        
        if(userService.findByEmail(email) != null){
            if(userService.findByEmail(email).getId() != currentUser.get().getId()) {
                return new ResponseEntity("Email not found!", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity("Email not found!", HttpStatus.BAD_REQUEST);
        }

        /*if(userService.findByUsername(username) != null){
            if(userService.findByUsername(username).getId() != currentUser.get().getId()) {
                return new ResponseEntity("Username not found!", HttpStatus.BAD_REQUEST);
            }
        }*/

        SecurityConfig securityConfig = new SecurityConfig();
        BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
        String dbPassword = currentUser.get().getPassword();

        if(null != currentPassword){
            if(passwordEncoder.matches(currentPassword,dbPassword)){
                if(newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")) {
                    currentUser.get().setPassword(passwordEncoder.encode(newPassword));
                }
                currentUser.get().setEmail(email);
            } else {
                return new ResponseEntity("Incorrect current password!", HttpStatus.BAD_REQUEST);
            }
        }

        currentUser.get().setFirstName(firstName);
        currentUser.get().setLastName(lastName);
        currentUser.get().setUsername(username);

        userService.save(currentUser.get());

        return new ResponseEntity("Update Success", HttpStatus.OK);
    }

    @RequestMapping("/getCurrentUser")
    public User getCurrentUser(HttpServletRequest request, @RequestBody HashMap<String, String> mapper)
            throws Exception {

        user = new User();
        String username = (String) mapper.get("username");

        if (null != username) {
            user = userService.findByUsername(mapper.get("username"));
        }

        return user;
    }

    public User passUserAround(){
        return  this.user;
    }


}