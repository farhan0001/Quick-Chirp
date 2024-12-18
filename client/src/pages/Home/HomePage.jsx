import React from 'react';
import {Grid2 as Grid} from '@mui/material';
import Navigation from '../../components/Navigation/Navigation';
import MainSection from '../../components/Main/MainSection';
import SideBar from '../../components/SideBar/SideBar';
import { Routes, Route } from 'react-router-dom';
import ProfileSection from '../../components/Profile/ProfileSection';
import TweetDetails from '../../components/TweetDetails/TweetDetails';

const HomePage = () => {
  return (
    <Grid container  className="px-5 lg:px-[108px]">
        <Grid size={{xs: 0, lg: 2.6 }} className="hidden lg:block w-full relative border">
            <Navigation />
        </Grid>
        <Grid size={{xs: 12, lg: 5.74 }} className="hidden lg:block w-full relative border mr-6">
            <Routes>
              <Route path="/" element={<MainSection />} />
              <Route path="/home" element={<MainSection />} />
              <Route path="/profile/:id" element={<ProfileSection />} />
              <Route path="/tweet/:id" element={<TweetDetails />} />
            </Routes>
        </Grid>
        <Grid size={{xs: 0, lg: 3.34 }} className="hidden lg:block w-full relative border">
            <SideBar />
        </Grid>
    </Grid>
  )
}

export default HomePage