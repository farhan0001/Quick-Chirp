package com.chirp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chirp.exception.UserException;
import com.chirp.model.User;
import com.chirp.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {
        return userRepository.findById(userId).orElseThrow(() -> new UserException("User not found with id: " + userId));
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new UserException("User not found with email: " + email);
        }

        return user;
    }

    @Override
    public User updateUser(Long userId, User user) throws UserException {
        User usr = findUserById(userId);

        if(user.getFullName() != null){
            usr.setFullName(user.getFullName());
        }

        if(user.getImage() != null){
            usr.setImage(user.getImage());
        }

        if(user.getBackgroundImg() != null){
            usr.setBackgroundImg(user.getBackgroundImg());
        }

        if(user.getBirthDate() != null){
            usr.setBirthDate(user.getBirthDate());
        }

        if(user.getBio() != null){
            usr.setBio(user.getBio());
        }

        if(user.getLocation() != null){
            usr.setLocation(user.getLocation());
        }

        if(user.getWebsite() != null){
            usr.setWebsite(user.getWebsite());
        }

        return userRepository.save(usr);
    }

    @Override
    public User followUser(Long userId, User user) throws UserException {
        User userToFollow = findUserById(userId);

        if(user.getFollowings().contains(userToFollow) && userToFollow.getFollowers().contains(user)){
            user.getFollowings().remove(userToFollow);
            userToFollow.getFollowers().remove(user);
        } else {
            user.getFollowings().add(userToFollow);
            userToFollow.getFollowers().add(user);
        }

        userRepository.save(userToFollow);
        userRepository.save(user);

        return userToFollow;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }
    
}
