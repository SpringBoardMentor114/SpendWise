package com.springboard.spendwise.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.springboard.spendwise.model.User;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);



}
