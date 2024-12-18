package com.x.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.x.dto.LikeDto;
import com.x.dto.mapper.LikeDtoMapper;
import com.x.exception.TweetException;
import com.x.exception.UserException;
import com.x.model.Likes;
import com.x.model.User;
import com.x.service.LikeService;
import com.x.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{tweetId}/likes")
    public ResponseEntity<LikeDto> likeTweet (@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Likes like = likeService.likeTweet(tweetId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/tweet/{tweetId}")
    public ResponseEntity<List<LikeDto>> getAllLikes (@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Likes> likes = likeService.getAllLikes(tweetId);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
