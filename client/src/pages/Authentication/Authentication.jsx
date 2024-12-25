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
                        <svg width="265" height="265" viewBox='0 0 24 24'>
                            <g>
                                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.62 0 3.138-.487 4.422-1.318l1.573 1.573c.39.39 1.025.39 1.415 0s.39-1.025 0-1.415l-1.573-1.573c.83-1.284 1.318-2.802 1.318-4.422 0-4.418-3.582-8-8-8zm0 2c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z"/>
                                <path d="M16.5 12c0-2.481-2.019-4.5-4.5-4.5-.552 0-1 .448-1 1s.448 1 1 1c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5c-.552 0-1 .448-1 1s.448 1 1 1c2.481 0 4.5-2.019 4.5-4.5z"/>
                            </g>
                        </svg>
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