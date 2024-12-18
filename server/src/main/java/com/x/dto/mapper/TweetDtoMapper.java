package com.x.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.x.dto.TweetDto;
import com.x.dto.UserDto;
import com.x.model.Tweet;
import com.x.model.User;
import com.x.util.TweetUtil;

public class TweetDtoMapper {
    public static TweetDto toTweetDto(Tweet tweet, User reqUser){
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());

        boolean isLiked = TweetUtil.isLikedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweettedByReqUser(reqUser, tweet);

        List<Long> retweetUserId = new ArrayList<>();

        for(User usr: tweet.getRetweetUser()){
            retweetUserId.add(usr.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setUser(user);
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweet().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);
        tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweet(), reqUser));
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

    public static List<TweetDto> toTweetDtos(List<Tweet> tweets, User reqUser){
        List<TweetDto> tweetDtos = new ArrayList<>();

        for(Tweet tweet : tweets){
            TweetDto tweetDto = toReplyTweetDto(tweet, reqUser);
            tweetDtos.add(tweetDto);
        }

        return tweetDtos;
    }

    private static TweetDto toReplyTweetDto(Tweet tweet, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());

        boolean isLiked = TweetUtil.isLikedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweettedByReqUser(reqUser, tweet);

        List<Long> retweetUserId = new ArrayList<>();

        for(User usr: tweet.getRetweetUser()){
            retweetUserId.add(usr.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setUser(user);
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweet().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }
}
