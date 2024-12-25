package com.chirp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Likes;
import com.chirp.model.Chirp;
import com.chirp.model.User;
import com.chirp.repository.LikeRepository;
import com.chirp.repository.ChirpRepository;

@Service
public class LikeServiceImplementation implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private ChirpService chirpService;

    @Autowired
    private ChirpRepository chirpRepository;

    @Override
    public Likes likeChirp(Long chirpId, User user) throws UserException, ChirpException {
        Likes existingLike = likeRepository.isLikeExists(user.getId(), chirpId);

        if(existingLike != null){
            likeRepository.deleteById(existingLike.getId());
            return existingLike;
        }

        Chirp chirp = chirpService.findById(chirpId);

        Likes like = new Likes();
        like.setChirp(chirp);
        like.setUser(user);

        Likes savedLike = likeRepository.save(like);
        chirp.getLikes().add(savedLike);
        chirpRepository.save(chirp);

        return savedLike;
    }

    @Override
    public List<Likes> getAllLikes(Long chirpId) throws ChirpException {
        return likeRepository.findByChirpId(chirpId);
    }
    
}
