package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.repository.UserRepository;
import com.springboard.spendwise.response.LoginResponse;
import com.springboard.spendwise.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    UserRepository userRepository;

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null) {
            String password = loginDTO.getPassword();
            String storedPassword = user.getPassword(); 
            if (password.equals(storedPassword)) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Login Failed", false);
            }
        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }


    @Override
    public User updateUser(String email, User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public void deleteUser(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @Override
    public List<User> viewUsers() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'viewUsers'");
    }

    @Override
    public User createUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }


}
