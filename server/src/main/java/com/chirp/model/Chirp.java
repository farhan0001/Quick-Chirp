package com.chirp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Chirp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "chirp", cascade = CascadeType.ALL)
    private List<Likes> likes = new ArrayList<>();

    @OneToMany
    private List<Chirp> replyChirp = new ArrayList<>();

    @ManyToMany
    private List<User> rechirpUser = new ArrayList<>();

    @ManyToOne
    private Chirp replyFor;

    private boolean isReply;
    private boolean isChirp;

    private LocalDateTime createdAt;
}
