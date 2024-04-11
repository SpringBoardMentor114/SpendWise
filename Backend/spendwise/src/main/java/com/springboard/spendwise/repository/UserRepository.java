package com.springboard.spendwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboard.spendwise.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
