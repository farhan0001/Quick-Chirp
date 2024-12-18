package com.x.service;

import java.util.List;

import com.x.exception.TweetException;
import com.x.exception.UserException;
import com.x.model.Tweet;
import com.x.model.User;
import com.x.request.TweetReplyRequest;

public interface TweetService {
    
    public Tweet createTweet(Tweet req, User user) throws UserException;
    public List<Tweet> findAllTweet();
    public Tweet reTweet(Long tweetId, User user) throws UserException, TweetException;
    public Tweet findById(Long tweetId) throws TweetException;
    public void deleteTweetById(Long tweetId, Long userId) throws UserException, TweetException;
    public Tweet removeFromRetweet(Long tweetId, User user) throws UserException, TweetException;
    public Tweet createdReply(TweetReplyRequest  req, User user) throws TweetException;
    public List<Tweet> getUserTweet(User user);
    public List<Tweet> findByLikesContainsUser(User user);
}
