package com.springboard.spendwise.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
public class SecurityConfig {
    // login 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return null;
    }
}
