package com.oasis.configuration;

import com.oasis.model.Users;
import com.oasis.repository.UsersRepo;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsersRepo userRepository;

    public UserDetailsServiceImpl(UsersRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        log.info("Loading user: {} with type: {}", user.getId(), user.getUserType().name());

        // Create authorities list
        List<GrantedAuthority> authorities = new ArrayList<>();

        // Add ROLE_ prefix for role-based security (for hasRole() checks)
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getUserType().name()));

        // Also add the authority without prefix for hasAuthority() checks
        authorities.add(new SimpleGrantedAuthority(user.getUserType().name()));

        // Add additional authorities based on user type
//        if (user.getUserType() == UserType.ADMIN) {
//            authorities.add(new SimpleGrantedAuthority("FULL_ACCESS"));
//            authorities.add(new SimpleGrantedAuthority("MANAGE_USERS"));
//            authorities.add(new SimpleGrantedAuthority("MANAGE_SERVICES"));
//        } else if (user.getUserType() == UserType.PARTNER) {
//            authorities.add(new SimpleGrantedAuthority("PROVIDE_SERVICES"));
//            authorities.add(new SimpleGrantedAuthority("VIEW_EARNINGS"));
//        } else if (user.getUserType() == UserType.NORMAL) {
//            authorities.add(new SimpleGrantedAuthority("REQUEST_SERVICES"));
//        } else if (user.getUserType() == UserType.ORGANIZATION) {
//            authorities.add(new SimpleGrantedAuthority("MANAGE_MULTIPLE_USERS"));
//            authorities.add(new SimpleGrantedAuthority("BULK_OPERATIONS"));
//        }

        // Use password if exists, otherwise empty string for OTP users
        String password = user.getPassword() != null ? user.getPassword() : "";

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId())
                .password(password)
                .authorities(authorities) // Set the authorities list
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
//                .disabled(!user.getIsActive()) // Account is disabled if not active
                .build();
    }
}