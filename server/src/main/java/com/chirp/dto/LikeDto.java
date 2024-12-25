package com.chirp.dto;

import lombok.Data;

@Data
public class LikeDto {
    private Long id;
    private UserDto user;
    private ChirpDto chirp;
}
