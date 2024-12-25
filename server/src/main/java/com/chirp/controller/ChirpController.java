package com.chirp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chirp.dto.ChirpDto;
import com.chirp.dto.mapper.ChirpDtoMapper;
import com.chirp.exception.ChirpException;
import com.chirp.exception.UserException;
import com.chirp.model.Chirp;
import com.chirp.model.User;
import com.chirp.request.ChirpReplyRequest;
import com.chirp.response.ApiResponse;
import com.chirp.service.ChirpService;
import com.chirp.service.UserService;

@RestController
@RequestMapping("/api/chirps")
public class ChirpController {
    
    @Autowired
    private ChirpService chirpService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<ChirpDto> createChirp(@RequestBody Chirp req, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        Chirp chirp = chirpService.createChirp(req, user);

        ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(chirp, user);

        return new ResponseEntity<>(chirpDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<ChirpDto> createChirp(@RequestBody ChirpReplyRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        Chirp chirp = chirpService.createdReply(req, user);

        ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(chirp, user);

        return new ResponseEntity<>(chirpDto, HttpStatus.CREATED);
    }

    @PutMapping("/{chirpId}/rechirp")
    public ResponseEntity<ChirpDto> reChirp(@PathVariable Long chirpId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        Chirp chirp = chirpService.reChirp(chirpId, user);

        ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(chirp, user);

        return new ResponseEntity<>(chirpDto, HttpStatus.OK);
    }

    @GetMapping("/{chirpId}")
    public ResponseEntity<ChirpDto> findChirpById(@PathVariable Long chirpId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        Chirp chirp = chirpService.findById(chirpId);

        ChirpDto chirpDto = ChirpDtoMapper.toChirpDto(chirp, user);

        return new ResponseEntity<>(chirpDto, HttpStatus.OK);
    }

    @DeleteMapping("/{chirpId}")
    public ResponseEntity<ApiResponse> deleteChirp(@PathVariable Long chirpId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        chirpService.deleteChirpById(chirpId, user.getId());

        ApiResponse res = new ApiResponse("Chirp deleted successfully", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<ChirpDto>> getAllChirps(@RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Chirp> chirps = chirpService.findAllChirp();

        List<ChirpDto> chirpDtos = ChirpDtoMapper.toChirpDtos(chirps, user);

        return new ResponseEntity<>(chirpDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChirpDto>> getUserAllChirps(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Chirp> chirps = chirpService.getUserChirp(user);

        List<ChirpDto> chirpDtos = ChirpDtoMapper.toChirpDtos(chirps, user);

        return new ResponseEntity<>(chirpDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<ChirpDto>> findChirpByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, ChirpException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Chirp> chirps = chirpService.findByLikesContainsUser(user);

        List<ChirpDto> chirpDtos = ChirpDtoMapper.toChirpDtos(chirps, user);

        return new ResponseEntity<>(chirpDtos, HttpStatus.OK);
    }
}
