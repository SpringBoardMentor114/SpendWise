package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.exception.ResourceAlreadyExistsException;
import com.springboard.spendwise.exception.ResourceNotFoundException;
import com.springboard.spendwise.model.User;
import com.springboard.spendwise.repository.UserRepository;
import com.springboard.spendwise.response.LoginResponse;
import com.springboard.spendwise.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    // Kunal work for registration
    @Override
    public User createUser(User user){
        if (userAlreadyExists(user.getEmail())){
            throw  new ResourceAlreadyExistsException("User already exists with the E-mail : " + user.getEmail());
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    private boolean userAlreadyExists(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }


    @Override
    public List<User> viewUsers() {
        return userRepository.findAll();
    }
    

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sorry, no user found with the Id :" +id));
    }

    @Override
    public User updateUser(Long id, User user) {
    User existingUser = userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (!existingUser.getEmail().equals(user.getEmail())) {
            if (userAlreadyExists(user.getEmail())) {
                throw new ResourceAlreadyExistsException("User already exists with the email: " + user.getEmail());
            }
        }
        
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        if (user.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            existingUser.setPassword(encodedPassword);
        }
        
        return userRepository.save(existingUser);
    }


    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)){
            throw new ResourceNotFoundException("Sorry, user not found");
        }
        userRepository.deleteById(id);
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
