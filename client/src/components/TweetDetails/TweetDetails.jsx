import React, { Fragment, useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from '../Cards/Tweet/TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTweetById } from '../../store/Tweet/Action';

const TweetDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { tweet } = useSelector(store => store)
    const handleBackNavigation = () => navigate(-1);

    useEffect(() => {
        if(id){
            dispatch(findTweetById(id));
        }
    })

    return (
        <Fragment>
            <section className='z-50 flex items-center sticky top-0 bg-opacity-95'>
                <KeyboardBackspaceIcon sx={{ '&:hover': { backgroundColor: '#e6eaed', borderRadius: "50%" } }} className='cursor-pointer' onClick={handleBackNavigation} />
                <h1 className='py-5 text-xl font-bold opactity-90 ml-5'>Tweet</h1>
            </section>

            <section>
                <TweetCard item={tweet.tweet} />
                <Divider sx={{margin: "2rem 0rem"}} />
            </section>

            <section>
                {tweet?.tweet?.replyTweets.map((item) => <TweetCard item={item} />)}
            </section>
        </Fragment>
    )
}

export default TweetDetails