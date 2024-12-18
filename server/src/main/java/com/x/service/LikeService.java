package com.x.service;

import java.util.List;

import com.x.exception.TweetException;
import com.x.exception.UserException;
import com.x.model.Likes;
import com.x.model.User;

public interface LikeService {

    public Likes likeTweet(Long tweetId, User user) throws UserException, TweetException;
    public List<Likes> getAllLikes(Long tweetId) throws TweetException;
}
