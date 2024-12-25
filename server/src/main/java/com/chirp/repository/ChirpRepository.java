package com.chirp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chirp.model.Chirp;
import com.chirp.model.User;

public interface ChirpRepository extends JpaRepository<Chirp, Long> {

    List<Chirp> findAllByIsChirpTrueOrderByCreatedAtDesc();
    List<Chirp> findByRechirpUserContainsOrUser_IdAndIsChirpTrueOrderByCreatedAtDesc(User user, Long userId);
    List<Chirp> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Chirp t JOIN t.likes l where l.user.id=:userId")
    List<Chirp> findByLikesUser_Id(Long userId);
}
