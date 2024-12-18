package com.x.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.x.config.JwtConstant;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        String jwtToken = Jwts.builder()
                        .issuedAt(new Date())
                        .expiration(new Date(new Date().getTime() + 86400000))
                        .claim("email", auth.getName())
                        .signWith(key)
                        .compact();
        
        return jwtToken;
    }

    public String getEmailFromToken(String jwtToken){
        jwtToken = jwtToken.substring(7);

        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtToken).getPayload();
        String email = String.valueOf(claims.get(("email")));

        return email;
    }
}
