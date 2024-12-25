package com.chirp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chirp.dto.LikeDto;
import com.chirp.dto.mapper.LikeDtoMapper;
import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Likes;
import com.chirp.model.User;
import com.chirp.service.LikeService;
import com.chirp.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{chirpId}/likes")
    public ResponseEntity<LikeDto> likeChirp (@PathVariable Long chirpId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException {
        User user = userService.findUserProfileByJwt(jwt);
        Likes like = likeService.likeChirp(chirpId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/chirp/{chirpId}")
    public ResponseEntity<List<LikeDto>> getAllLikes (@PathVariable Long chirpId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Likes> likes = likeService.getAllLikes(chirpId);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
