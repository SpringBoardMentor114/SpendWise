package com.springboard.spendwise.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.model.User;

@Service
public interface UserService {
    User createUser(User user);
    User updateUser(String email, User user);
    List<User>viewUsers();
    void deleteUser(String email);
    UserDetails loadUserByUsername(String username);
}
