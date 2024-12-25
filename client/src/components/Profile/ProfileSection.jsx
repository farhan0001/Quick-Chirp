import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import coverImg from '../../assets/images/3.jpg'
import { Avatar, Box, Button, Tab } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChirpCard from '../Cards/Chirp/ChirpCard';
import ProfileModal from '../../modals/Profile/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUserAction } from '../../store/Auth/Action';
import { getUserChirps } from '../../store/Chirp/Action';

const ProfileSection = () => {

    const [tabValue, setTabValue] = useState("1");
    const [openProfileModal, setopenProfileModal] = useState(false);
    const { auth, chirp } = useSelector(store => store);
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();
    const handleBackNavigation = () => navigate(-1);
    const handleOpenProfileModal = () => setopenProfileModal(true);
    const handleCloseProfileModal = () => setopenProfileModal(false);
    const handleFollowUser = () => {
        dispatch(followUserAction(id))
    }
    const handleTabChange = (event, value) => {
        setTabValue(value);

        if (value === 1) {

        } else if (value === 4) {

        }
    }

    useEffect(() => {
        dispatch(findUserById(id))
        dispatch(getUserChirps(id));
    },[id, dispatch]);

    return (
        <div>
            <section className='z-50 sticky top-0 bg-opacity-95 pl-2 bg-white'>
                <div className='flex items-center'>
                    <div className='transform translate-y-2'> 
                        <KeyboardBackspaceIcon sx={{ paddingY: "2px", '&:hover': { backgroundColor: '#e6eaed', borderRadius: "50%" } }} className='cursor-pointer' onClick={handleBackNavigation} />
                    </div>
                    <h3 className='py-0 font-bold opactity-90 ml-[22px] '>{auth?.findUser?.fullName}</h3>
                    {
                        true && (
                            <VerifiedIcon sx={{ width: "18px", height: "18px" }} className='text-[#2e90f2]' />
                        )
                    }
                </div>
                <p className='text-[11px] text-gray-600 pl-[46px] transform -translate-y-0.5'>4,959 posts</p>
            </section>

            <section>
                <img className='w-full h-[9.9rem] object-cover cursor-pointer' src={coverImg} alt="Cover" />
            </section>

            <section className='pl-[10px]'>
                <div className='flex justify-between items-start mt-[10px] h-[3.4rem] pr-3'>
                    <Avatar className='tranform -translate-y-[68px] cursor-pointer' alt='Md Farhan Quamar' src={ auth?.findUser?.image } sx={{ width: "7rem", height: "7rem", border: "3px solid white" }} />

                    {auth?.findUser?.reqUser ? <Button sx={{ width:"6.7rem", height: "1.7rem", fontSize: "11.6px", fontWeight: "600", borderRadius: "20px", border: "1px solid #cccecf", color: "black", '&:hover': {backgroundColor: "#d9dcde"} }} onClick={handleOpenProfileModal}><p>Set up profile</p></Button>
                        : <Button variant='contained' sx={{  width:"6.7rem", height: "1.7rem", fontSize: "11.6px", fontWeight: "600", borderRadius: "20px", border: "1px solid #cccecf", color: "white", backgroundColor:"black", '&:hover': {backgroundColor: "#d9dcde"} }} onClick={handleFollowUser}> {auth?.findUser?.followed ? "Unfollow" : "Follow"} </Button>
                    }
                </div>

                <div>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-l pr-0.5'>{auth?.findUser?.fullName}</h1>
                        {
                            true && (
                                <VerifiedIcon sx={{ width: "18px", height: "18px" }} className='text-[#2e90f2]' />
                            )
                        }
                    </div>
                    <h6 className='text-gray-500 text-[12px]'>@{auth?.findUser?.fullName.split(" ").join("_").toLowerCase()}</h6>
                </div>

                <div className='mt-2 space-y-1 text-[13px] opacity-80 font-[sans-serif]'>
                    <p>{ auth?.findUser?.bio }</p>
                    <div className='py-1 flex space-x-2'>
                        <div className='flex items-center text-gray-500'>
                            <LocationOnIcon className='transform -translate-x-[3px] -translate-y-[1px]' sx={{ width: "18px", height: "18px" }} />
                            <p className='ml-0'>{ auth?.findUser?.location }</p>
                        </div>

                        <div className='flex items-center text-gray-500'>
                            <BusinessCenterIcon className='transform -translate-y-[1px]' sx={{ width: "18px", height: "18px" }} />
                            <p className='ml-1'>Education</p>
                        </div>

                        <div className='flex items-center text-gray-500'>
                            <CalendarMonthIcon className='transform -translate-y-[1.4px]' sx={{ width: "18px", height: "18px" }} />
                            <p className='ml-1'>Joined Dec 2024</p>
                        </div>
                    </div>

                    <div className='flex items-center space-x-5'>
                        <div className='flex items-center space-x-1 text-[12px]'>
                            <span className='font-[700]'>{ auth?.findUser?.followings?.length }</span>
                            <span className='text-gray-500'>Following</span>
                        </div>

                        <div className='flex items-center space-x-1 text-[12px]'>
                            <span className='font-[700]'>{ auth?.findUser?.followers?.length }</span>
                            <span className='text-gray-500'>Followers</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='pt-[10px]'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': {paddingBottom: "6px"} }} >
                            <TabList onChange={handleTabChange} >
                                <Tab className='' sx={{ textTransform: "none", fontSize: "12px", fontWeight: "600", marginRight: 3.8, marginLeft: 1.2 }} label="Chirps" value="1" />
                                <Tab sx={{ textTransform: "none", fontSize: "12px", fontWeight: "600", marginRight: 3.8 }} label="Replies" value="2" />
                                <Tab sx={{ textTransform: "none", fontSize: "12px", fontWeight: "600", marginRight: 3.8 }} label="Media" value="3" />
                                <Tab sx={{ textTransform: "none", fontSize: "12px", fontWeight: "600" }} label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {chirp?.chirps?.map((value, index) => <ChirpCard item={value} key={index} />)}
                        </TabPanel>
                        <TabPanel value="2">Replies</TabPanel>
                        <TabPanel value="3">Media</TabPanel>
                        <TabPanel value="4">Likes</TabPanel>
                    </TabContext>
                </Box>
            </section>

            <section>
                <ProfileModal open={openProfileModal} handleClose={handleCloseProfileModal} />
            </section>
        </div>
    )
}

export default ProfileSection