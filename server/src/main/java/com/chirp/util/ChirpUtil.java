package com.chirp.util;

import com.chirp.model.Chirp;
import com.chirp.model.Likes;
import com.chirp.model.User;

public class ChirpUtil {
    
    public final static boolean isLikedByReqUser(User reqUser, Chirp chirp){
        for(Likes like: chirp.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRechirpedByReqUser(User reqUser, Chirp chirp){
        for(User user: chirp.getRechirpUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
