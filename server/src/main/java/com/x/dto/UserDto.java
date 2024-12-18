package com.x.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String fullName;
    private String email;
    private String image;
    private String location;
    private String website;
    private String birthDate;
    private String mobile;
    private String backgroundImg;
    private String bio;
    private List<UserDto> followers = new ArrayList<>();
    private List<UserDto> followings = new ArrayList<>();
    private boolean isVerified;

    private boolean reqUser;
    private boolean isLoggedInWithGoogle;
    private boolean folllowed;
}
