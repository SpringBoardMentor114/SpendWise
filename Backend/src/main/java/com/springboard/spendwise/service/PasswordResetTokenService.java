package com.spendwise.demo.service.framework;

import com.spendwise.demo.entity.PasswordResetToken;

public interface PasswordResetTokenService {
    PasswordResetToken findByToken(String token);
    PasswordResetToken save(PasswordResetToken passwordResetToken);
}
