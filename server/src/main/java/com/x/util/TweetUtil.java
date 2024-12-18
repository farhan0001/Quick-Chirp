package com.x.util;

import com.x.model.Likes;
import com.x.model.Tweet;
import com.x.model.User;

public class TweetUtil {
    
    public final static boolean isLikedByReqUser(User reqUser, Tweet tweet){
        for(Likes like: tweet.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRetweettedByReqUser(User reqUser, Tweet tweet){
        for(User user: tweet.getRetweetUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
