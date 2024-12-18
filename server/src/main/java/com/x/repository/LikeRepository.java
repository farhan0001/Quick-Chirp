package com.x.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.x.model.Likes;

public interface LikeRepository extends JpaRepository<Likes, Long> {

    @Query("SELECT l FROM Likes l WHERE l.user.id=:userId AND l.tweet.id=:tweetId")
    public Likes isLikeExists(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT l FROM Likes l WHERE l.tweet.id=:tweetId")
    public List<Likes> findByTweetId(@Param("tweetId") Long tweetId);
}
