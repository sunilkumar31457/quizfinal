package com.quizapp.quiz_backend.config;

import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String email = "bodduvenkatasunil2005@gmail.com";
        String rawPassword = "sunil@123";

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Always reset the password to ensure it's correctly hashed
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
            System.out.println("Password for " + email + " has been reset/updated to encoded version of: " + rawPassword);
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(newUser);
            System.out.println("Created new user " + email + " with encoded password.");
        }
    }
}
