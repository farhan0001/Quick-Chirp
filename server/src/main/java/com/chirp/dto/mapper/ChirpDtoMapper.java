package com.chirp.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.chirp.dto.ChirpDto;
import com.chirp.dto.UserDto;
import com.chirp.model.Chirp;
import com.chirp.model.User;
import com.chirp.util.ChirpUtil;

public class ChirpDtoMapper {
    public static ChirpDto toChirpDto(Chirp chirp, User reqUser){
        UserDto user = UserDtoMapper.toUserDto(chirp.getUser());

        boolean isLiked = ChirpUtil.isLikedByReqUser(reqUser, chirp);
        boolean isRechirped = ChirpUtil.isRechirpedByReqUser(reqUser, chirp);

        List<Long> rechirpUserId = new ArrayList<>();

        for(User usr: chirp.getRechirpUser()){
            rechirpUserId.add(usr.getId());
        }

        ChirpDto chirpDto = new ChirpDto();
        chirpDto.setId(chirp.getId());
        chirpDto.setUser(user);
        chirpDto.setContent(chirp.getContent());
        chirpDto.setCreatedAt(chirp.getCreatedAt());
        chirpDto.setImage(chirp.getImage());
        chirpDto.setTotalLikes(chirp.getLikes().size());
        chirpDto.setTotalReplies(chirp.getReplyChirp().size());
        chirpDto.setTotalRechirps(chirp.getRechirpUser().size());
        chirpDto.setLiked(isLiked);
        chirpDto.setRechirp(isRechirped);
        chirpDto.setRechirpUserId(rechirpUserId);
        chirpDto.setReplyChirps(toChirpDtos(chirp.getReplyChirp(), reqUser));
        chirpDto.setVideo(chirp.getVideo());

        return chirpDto;
    }

    public static List<ChirpDto> toChirpDtos(List<Chirp> chirps, User reqUser){
        List<ChirpDto> chirpDtos = new ArrayList<>();

        for(Chirp chirp : chirps){
            ChirpDto chirpDto = toReplyChirpDto(chirp, reqUser);
            chirpDtos.add(chirpDto);
        }

        return chirpDtos;
    }

    private static ChirpDto toReplyChirpDto(Chirp chirp, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(chirp.getUser());

        boolean isLiked = ChirpUtil.isLikedByReqUser(reqUser, chirp);
        boolean isRechirped = ChirpUtil.isRechirpedByReqUser(reqUser, chirp);

        List<Long> rechirpUserId = new ArrayList<>();

        for(User usr: chirp.getRechirpUser()){
            rechirpUserId.add(usr.getId());
        }

        ChirpDto chirpDto = new ChirpDto();
        chirpDto.setId(chirp.getId());
        chirpDto.setUser(user);
        chirpDto.setContent(chirp.getContent());
        chirpDto.setCreatedAt(chirp.getCreatedAt());
        chirpDto.setImage(chirp.getImage());
        chirpDto.setTotalLikes(chirp.getLikes().size());
        chirpDto.setTotalReplies(chirp.getReplyChirp().size());
        chirpDto.setTotalRechirps(chirp.getRechirpUser().size());
        chirpDto.setLiked(isLiked);
        chirpDto.setRechirp(isRechirped);
        chirpDto.setRechirpUserId(rechirpUserId);
        chirpDto.setVideo(chirp.getVideo());

        return chirpDto;
    }
}
