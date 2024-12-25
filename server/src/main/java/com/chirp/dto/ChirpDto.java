package com.chirp.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class ChirpDto {
    
    private Long id;
    private String content;
    private String image;
    private String video;
    private UserDto user;
    private LocalDateTime createdAt;
    private int totalLikes;
    private int totalReplies;
    private int totalRechirps;
    private boolean isLiked;
    private boolean isRechirp;
    private List<Long> rechirpUserId;
    private List<ChirpDto> replyChirps;
}
