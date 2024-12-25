import React, { Fragment, useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import ChirpCard from '../Cards/Chirp/ChirpCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findChirpById } from '../../store/Chirp/Action';

const ChirpDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { chirp } = useSelector(store => store)
    const handleBackNavigation = () => navigate(-1);

    useEffect(() => {
        if(id){
            dispatch(findChirpById(id));
        }
    })

    return (
        <Fragment>
            <section className='z-50 flex items-center sticky top-0 bg-opacity-95'>
                <KeyboardBackspaceIcon sx={{ '&:hover': { backgroundColor: '#e6eaed', borderRadius: "50%" } }} className='cursor-pointer' onClick={handleBackNavigation} />
                <h1 className='py-5 text-xl font-bold opactity-90 ml-5'>Chirp</h1>
            </section>

            <section>
                <ChirpCard item={chirp.chirp} />
                <Divider sx={{margin: "2rem 0rem"}} />
            </section>

            <section>
                {chirp?.chirp?.replyChirps.map((item) => <ChirpCard item={item} />)}
            </section>
        </Fragment>
    )
}

export default ChirpDetails