package com.springboard.spendwise.service;


import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.response.LoginResponse;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface UserService {


    LoginResponse loginUser(LoginDTO loginDTO);

    User updateUser(String email, User user);

    void deleteUser(String email);

    List<User> viewUsers();

    User createUser(User user);
}
