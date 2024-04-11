package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.model.User;
import com.springboard.spendwise.repository.UserRepository;
import com.springboard.spendwise.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user){
        User existingUser = userRepository.findById(id).get();
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
    public void deleteUser(Long id) {
        userRepository.deleteById((long) id);
    }
}
