import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubscriptionModal from '../../modals/Subscription/SubscriptionModal';

const SideBar = () => {

    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    
    const handleThemeChange = () => {

    };
    const handleOpenSubscriptionModal = () => {
        setOpenSubscriptionModal(true);
    };
    const handleCloseSubscriptionModal = () => {
        setOpenSubscriptionModal(false);
    }

  return (
    <div className='py-0 sticky top-0 pb-6'>
        <div className="relative flex items-center pr-1">
            <input type='text' className='py-3 rounded-full text-gray-500 w-full pl-12' />
            <div className='absolute top-0 left-0 pl-3 pt-3'>
                <SearchIcon className='text-gray-500' />
            </div>
            <Brightness6Icon className='ml-3 cursor-pointer' onClick={handleThemeChange} />
        </div>

        <section className='my-5 pl-3 pr-3'>
            <h1 className='text-[16px] font-bold font-[Seoge UI]'>Get Verified</h1>
            <h1 className='text-[14px] font-semibold font-[Seoge UI] my-2'>Subscribe to unlock new features</h1>
            <Button variant='contained'
                onClick={handleOpenSubscriptionModal}
                sx={{padding: "4px", paddingX: "14px", borderRadius: "25px", backgroundColor:'#1d9cf0', fontWeight: "700", '&:hover': {backgroundColor: "#067ac7"}}}
            >
                <span className='text-[12px] capitalize text-[white]'>Get Verified</span>
            </Button>
        </section>

        <section>
            <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal} />
        </section>

        <section className='mt-7 space-y-5 pl-3 pr-3'>
            <h1 className='font-bold text-[16px] py-1 font-[Seoge UI]'>What's happening</h1>

            <div className='flex justify-between w-full font-[Seoge UI]'>
                <div>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>Politics.Trending</p>
                    <p className='font-bold text-[13px]'> Allahu Akbar</p>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>20.5K posts</p>
                </div>
                <MoreHorizIcon sx={{minWIdth: "0px", width: "16px", opacity: "80"}} />
            </div>
            
            <div className='flex justify-between w-full font-[Seoge UI]'>
                <div>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>Trending</p>
                    <p className='font-bold text-[13px]'>#SSCCGL2024</p>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>282K posts</p>
                </div>
                <MoreHorizIcon sx={{minWIdth: "0px", width: "16px", opacity: "80"}} />
            </div>

            <div className='flex justify-between w-full font-[Seoge UI]'>
                <div>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>Politics.Trending</p>
                    <p className='font-bold text-[13px]'>Libya</p>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>77.4K posts</p>
                </div>
                <MoreHorizIcon sx={{minWIdth: "0px", width: "16px", opacity: "80"}} />
            </div>

            <div className='flex justify-between w-full font-[Seoge UI]'>
                <div>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>Entertainment.Trending</p>
                    <p className='font-bold text-[13px]'>#PushpaTheWildFire</p>
                    <p className='text-[11px] font-[500] text-[gray] opacity-80'>25.8K posts</p>
                </div>
                <MoreHorizIcon sx={{minWIdth: "0px", width: "16px", opacity: "80"}} />
            </div>
        </section>

    </div>
  )
}

export default SideBar