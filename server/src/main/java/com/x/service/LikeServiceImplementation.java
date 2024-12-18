package com.x.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.exception.TweetException;
import com.x.exception.UserException;
import com.x.model.Likes;
import com.x.model.Tweet;
import com.x.model.User;
import com.x.repository.LikeRepository;
import com.x.repository.TweetRepository;

@Service
public class LikeServiceImplementation implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Likes likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Likes existingLike = likeRepository.isLikeExists(user.getId(), tweetId);

        if(existingLike != null){
            likeRepository.deleteById(existingLike.getId());
            return existingLike;
        }

        Tweet tweet = tweetService.findById(tweetId);

        Likes like = new Likes();
        like.setTweet(tweet);
        like.setUser(user);

        Likes savedLike = likeRepository.save(like);
        tweet.getLikes().add(savedLike);
        tweetRepository.save(tweet);

        return savedLike;
    }

    @Override
    public List<Likes> getAllLikes(Long tweetId) throws TweetException {
        return likeRepository.findByTweetId(tweetId);
    }
    
}
