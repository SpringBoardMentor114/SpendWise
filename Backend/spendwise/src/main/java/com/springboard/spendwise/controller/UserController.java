package com.springboard.spendwise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.springboard.spendwise.model.User;
import com.springboard.spendwise.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
public class UserController {
    
    @Autowired
    UserService userServiceImpl;

    @PostMapping("users")
    public User createUser(@RequestBody User user) {
        if (user.getId() != 0) {
            return userServiceImpl.updateUser(null, user);
        }
        
        return userServiceImpl.createUser(user);
    }

    @GetMapping("users")
    public List<User> getAllUsers() {
        return userServiceImpl.viewUsers();
    }

    @DeleteMapping("users/{id}")
    public void deleteUser(@PathVariable Long id){
        userServiceImpl.deleteUser(id);
    }

    @PutMapping("users/{id}")
    public User putMethodName(@PathVariable Long id, @RequestBody User user) {
        return userServiceImpl.updateUser(id, user);
    }
    
    
}
