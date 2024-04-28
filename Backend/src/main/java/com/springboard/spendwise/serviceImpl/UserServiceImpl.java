package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.Dto.LoginDTO;
import com.springboard.spendwise.exception.UserAlreadyExistsException;
import com.springboard.spendwise.exception.UserNotFoundException;
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

    // Kunal work for registration
    @Override
    public User createUser(User user){
        if (userAlreadyExists(user.getEmail())){
            throw  new UserAlreadyExistsException("User already exists with the E-mail : " + user.getEmail());
        }
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
                .orElseThrow(() -> new UserNotFoundException("Sorry, no user found with the Id :" +id));
    }

    @Override
    public User updateUser(Long id, User user) {
    User existingUser = userRepository.findById(id)
                        .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        if (!existingUser.getEmail().equals(user.getEmail())) {
            if (userAlreadyExists(user.getEmail())) {
                throw new UserAlreadyExistsException("User already exists with the email: " + user.getEmail());
            }
        }else{
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
        }    
        return userRepository.save(existingUser);
    }


    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("Sorry, user not found");
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
