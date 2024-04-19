package com.springboard.spendwise.controller;


import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.response.LoginResponse;
import com.springboard.spendwise.service.UserService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
// import org.springframework.web.bind.annotation.*; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/register/users")
@Validated
public class UserController {

// kunal work for registration
    @Autowired
    private UserService userService;

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

// login (use api http://localhost:8085/register/users/login) or using use (/user/login) by changing the @RequestMapping path
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

}
