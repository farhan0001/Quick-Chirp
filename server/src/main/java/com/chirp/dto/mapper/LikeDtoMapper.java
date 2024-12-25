package com.chirp.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.chirp.dto.LikeDto;
import com.chirp.dto.ChirpDto;
import com.chirp.dto.UserDto;
import com.chirp.model.Likes;
import com.chirp.model.User;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Likes like, User reqUser){
        UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
        ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(like.getChirp(), reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setChirp(chirpDto);
        likeDto.setUser(userDto);

        return likeDto;
    }
    
    public static List<LikeDto> toLikeDtos(List<Likes> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();

        for(Likes like: likes){
            UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
            ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(like.getChirp(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setChirp(chirpDto);
            likeDto.setUser(userDto);

            likeDtos.add(likeDto);
        }

        return likeDtos;
    }
}
