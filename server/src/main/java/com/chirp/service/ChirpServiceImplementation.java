package com.chirp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Chirp;
import com.chirp.model.User;
import com.chirp.repository.ChirpRepository;
import com.chirp.request.ChirpReplyRequest;

@Service
public class ChirpServiceImplementation implements ChirpService {

    @Autowired
    private ChirpRepository chirpRepository;

    @Override
    public Chirp createChirp(Chirp req, User user) throws UserException {
        Chirp chirp = new Chirp();
        chirp.setContent(req.getContent());
        chirp.setCreatedAt(LocalDateTime.now());
        chirp.setImage(req.getImage());
        chirp.setUser(user);
        chirp.setReply(false);
        chirp.setChirp(true);
        chirp.setVideo(req.getVideo());

        return chirpRepository.save(chirp);
    }

    @Override
    public List<Chirp> findAllChirp() {
        return chirpRepository.findAllByIsChirpTrueOrderByCreatedAtDesc();
    }

    @Override
    public Chirp reChirp(Long chirpId, User user) throws UserException, ChirpException {
        Chirp chirp = findById(chirpId);
        if(chirp.getRechirpUser().contains(user)){
            chirp.getRechirpUser().remove(user);
        } else {
            chirp.getRechirpUser().add(user);
        }

        return chirpRepository.save(chirp);
    }

    @Override
    public Chirp findById(Long chirpId) throws ChirpException {
        return chirpRepository.findById(chirpId)
                    .orElseThrow(()-> new ChirpException("Twwet not found with id: " + chirpId));
    }

    @Override
    public void deleteChirpById(Long chirpId, Long userId) throws UserException, ChirpException {
        Chirp chirp = findById(chirpId);

        if(!userId.equals(chirp.getUser().getId())){
            throw new UserException("Not authorized to delete this chirp");
        }

        chirpRepository.deleteById(chirp.getId());
    }

    @Override
    public Chirp removeFromRechirp(Long chirpId, User user) throws UserException, ChirpException {
        return null;
    }

    @Override
    public Chirp createdReply(ChirpReplyRequest req, User user) throws ChirpException {

        Chirp replyFor = findById(req.getChirpId());

        Chirp chirp = new Chirp();
        chirp.setContent(req.getContent());
        chirp.setCreatedAt(LocalDateTime.now());
        chirp.setImage(req.getImage());
        chirp.setUser(user);
        chirp.setReply(true);
        chirp.setChirp(false);
        chirp.setReplyFor(replyFor);

        Chirp savedReplyChirp = chirpRepository.save(chirp);
        chirp.getReplyChirp().add(savedReplyChirp);
        chirpRepository.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Chirp> getUserChirp(User user) {
        return chirpRepository.findByRechirpUserContainsOrUser_IdAndIsChirpTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Chirp> findByLikesContainsUser(User user) {
        return chirpRepository.findByLikesUser_Id(user.getId());
    }
    
}
