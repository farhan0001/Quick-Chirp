package com.chirp.service;

import java.util.List;

import com.chirp.exception.UserException;
import com.chirp.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;
    public User findUserProfileByJwt(String jwt) throws UserException;
    public User updateUser(Long userId, User user) throws UserException;
    public User followUser(Long userId, User user) throws UserException;
    public List<User> searchUser(String query);
}
