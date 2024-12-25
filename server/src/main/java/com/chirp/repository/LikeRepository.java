package com.chirp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chirp.model.Likes;

public interface LikeRepository extends JpaRepository<Likes, Long> {

    @Query("SELECT l FROM Likes l WHERE l.user.id=:userId AND l.chirp.id=:chirpId")
    public Likes isLikeExists(@Param("userId") Long userId, @Param("chirpId") Long chirpId);

    @Query("SELECT l FROM Likes l WHERE l.chirp.id=:chirpId")
    public List<Likes> findByChirpId(@Param("chirpId") Long chirpId);
}
