package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.repository.UserRepository;
import com.springboard.spendwise.response.LoginResponse;
import com.springboard.spendwise.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    
    @Autowired
    UserRepository userRepository;

    // Kunal work for registration
    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User updateUser(String email, User user){
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) { 
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public List<User> viewUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid Username or Password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), null);
    }
   // Kunal work

// login
    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null) {
            String password = loginDTO.getPassword();
            String storedPassword = user.getPassword(); 
            if (password.equals(storedPassword)) {
                return new LoginResponse("Login Success", true);
            } else if(!password.equals(storedPassword) ) {
                return new LoginResponse("Password Incorrect", false);
            }else {
                return new LoginResponse("Login Failed", false);
            }
        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }
}
