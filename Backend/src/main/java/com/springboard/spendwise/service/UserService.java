package com.springboard.spendwise.service;


import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.response.LoginResponse;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    LoginResponse loginUser(LoginDTO loginDTO);

    // Kunal work for registration
    User createUser(User user);
    User updateUser(String email, User user);
    List<User>viewUsers();
    void deleteUser(String email);
    UserDetails loadUserByUsername(String username);
}
