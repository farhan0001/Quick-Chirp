import { Button, Grid2 as Grid} from '@mui/material'
import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import AuthenticationModal from '../../modals/Authentication/AuthenticationModal'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const navigate = useNavigate();

    const handleOpenAuthModal = () => setOpenAuthModal(true);
    const handleCloseAuthModal = () => setOpenAuthModal(false);

  return (
    <div>
        <Grid className='overflow-y-hidden' container>
            <Grid className='hidden lg:block' size={{lg: 6.44 }}>
                <div className='w-full h-screen'>
                    <div className='absolute top-[22.9%] left-[16.4%]'>
                        <svg width="265" height="265" viewBox='0 0 24 24'><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                    </div>
                </div>
            </Grid>

            <Grid className='px-10 pt-10' size={{xs: 12, lg: 5.56 }}>
                <h1 className='mt-10 font-[900] text-5xl font-[verdana]'>Happening now</h1>
                <h1 className='font-bold text-2xl pt-12 pb-5 font-[verdana]'>Join today.</h1>

                <div className='w-[60%]'>
                    <div className='w-full'>
                        <GoogleLogin width={250} />
                        <p className='py-[6px] text-center transform -translate-x-8'>or</p>
                        <Button onClick={() => {handleOpenAuthModal(); navigate("/signup")}} fullWidth variant='contained' sx={{ width: "240px", backgroundColor: "#1d9aee", fontSize: "12px", fontWeight: "bold", borderRadius: "29px", py: "6px"}}>Create account</Button>
                        <p className='text-[9.5px] text-gray-600 mt-2 leading-tight'>By signing up, you agree to the <span className='text-[#1d9aee] cursor-pointer'>Terms of Service </span> and <span className='text-[#1d9aee] cursor-pointer'>Privacy Policy</span>, including <span className='text-[#1d9aee] cursor-pointer'>Cookie Use</span>.</p>
                    </div>

                    <div className='mt-10'>
                        <h1 className='font-[700] text-[14px] mb-4'>Already have an account?</h1>
                        <Button onClick={() => {handleOpenAuthModal(); navigate("/signin")}} fullWidth variant='outlined' sx={{ width: "240px", color: "#1d9aee", fontSize: "12px", fontWeight: "bold", borderRadius: "29px", py: "6px"}}>Sign in</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
        
        <AuthenticationModal open={openAuthModal} handleClose={handleCloseAuthModal} />

    </div>
  )
}

export default Authentication