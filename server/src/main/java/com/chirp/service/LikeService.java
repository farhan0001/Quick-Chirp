package com.chirp.service;

import java.util.List;

import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Likes;
import com.chirp.model.User;

public interface LikeService {

    public Likes likeChirp(Long chirpId, User user) throws UserException, ChirpException;
    public List<Likes> getAllLikes(Long chirpId) throws ChirpException;
}
