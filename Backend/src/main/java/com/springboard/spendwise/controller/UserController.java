package com.springboard.spendwise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import com.springboard.spendwise.model.User;
import com.springboard.spendwise.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;





@RestController
@RequestMapping("/register/users")
@Validated
public class UserController {
    
    @Autowired
    UserService userServiceImpl;

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userServiceImpl.createUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userServiceImpl.viewUsers();
    }

    @DeleteMapping("/users/{email}")
    public void deleteUser(@PathVariable String email){
        userServiceImpl.deleteUser(email);
    }

    @PutMapping("/users/{email}")
    public User updateUser(@PathVariable String email, @RequestBody User user) {
        return userServiceImpl.updateUser(email, user);
    }
    
    
}
