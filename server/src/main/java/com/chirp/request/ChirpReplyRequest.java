package com.chirp.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChirpReplyRequest {
    
    private String content;
    private Long chirpId;
    private LocalDateTime createdAt;
    private String image;
}
