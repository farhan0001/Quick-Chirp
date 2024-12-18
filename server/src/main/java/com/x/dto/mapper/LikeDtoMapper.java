package com.x.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.x.dto.LikeDto;
import com.x.dto.TweetDto;
import com.x.dto.UserDto;
import com.x.model.Likes;
import com.x.model.User;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Likes like, User reqUser){
        UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTweet(tweetDto);
        likeDto.setUser(userDto);

        return likeDto;
    }
    
    public static List<LikeDto> toLikeDtos(List<Likes> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();

        for(Likes like: likes){
            UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweetDto = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setTweet(tweetDto);
            likeDto.setUser(userDto);

            likeDtos.add(likeDto);
        }

        return likeDtos;
    }
}
