package com.x.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.x.dto.TweetDto;
import com.x.dto.mapper.TweetDtoMapper;
import com.x.exception.TweetException;
import com.x.exception.UserException;
import com.x.model.Tweet;
import com.x.model.User;
import com.x.request.TweetReplyRequest;
import com.x.response.ApiResponse;
import com.x.service.TweetService;
import com.x.service.UserService;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {
    
    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createTweet(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> createTweet(@RequestBody TweetReplyRequest req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createdReply(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/retweet")
    public ResponseEntity<TweetDto> reTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.reTweet(tweetId, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.findById(tweetId);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        tweetService.deleteTweetById(tweetId, user.getId());

        ApiResponse res = new ApiResponse("Tweet deleted successfully", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.findAllTweet();

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);

        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getUserAllTweets(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.getUserTweet(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);

        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>> findTweetByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.findByLikesContainsUser(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);

        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
}
