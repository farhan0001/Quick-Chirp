package com.chirp.service;

import java.util.List;

import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Chirp;
import com.chirp.model.User;
import com.chirp.request.ChirpReplyRequest;

public interface ChirpService {
    
    public Chirp createChirp(Chirp req, User user) throws UserException;
    public List<Chirp> findAllChirp();
    public Chirp reChirp(Long chirpId, User user) throws UserException, ChirpException;
    public Chirp findById(Long chirpId) throws ChirpException;
    public void deleteChirpById(Long chirpId, Long userId) throws UserException, ChirpException;
    public Chirp removeFromRechirp(Long chirpId, User user) throws UserException, ChirpException;
    public Chirp createdReply(ChirpReplyRequest  req, User user) throws ChirpException;
    public List<Chirp> getUserChirp(User user);
    public List<Chirp> findByLikesContainsUser(User user);
}
