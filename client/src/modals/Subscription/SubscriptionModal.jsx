import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "10px"
};

export default function SubscriptionModal({open, handleClose}) {
    
    const [plan, setPlan] = React.useState("annually");

    const features = ['Prioritized rankings in conversations and search',
        "See approximately twice as many Chirps between ads in your for You and Following timelines",
        "Add bold and italic text in your chirps",
        "Post longer videos and 1080p viso uploads",
        "All the existing blue features, including Edit Chirp, Bookmark Folders and early access to new features"
    ];

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex items-center space-x-3'>
                        <IconButton onClick={handleClose} aria-label='delete'>
                            <CloseIcon />
                        </IconButton>
                        <p className='pl-36 font-bold'>Subscription Plan</p>
                    </div>

                    <div className="flex justify-center py-4">
                        <div className='w-[80%] space-y-8'>
                            <div className='p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-300'>
                                <h1 className='text-xl pr-5'>Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</h1>
                                <VerifiedIcon sx={{ width: "100px", height: "100px" }} className='text-[#2e90f2]' />
                            </div>

                            <div className="flex justify-between border rounded-full px-5 py-3 border-gray-600">
                                <div>
                                    <span onClick={() => setPlan('annually')} className={`${plan === 'annually' ? 'text-black' : 'text-gray-400'} cursor-pointer`}>Annually</span>
                                    <span className='text-green-500 text-sm ml-5'>SAVE 12%</span>
                                </div>

                                <p onClick={() => setPlan('monthly')} className={`${plan === 'monthly' ? 'text-black' : 'text-gray-400'} cursor-pointer`}>
                                    Monthly
                                </p>
                            </div>

                            <div className='space-y-3'>
                                {
                                    features.map((item, index) =>
                                        <div className='flex items-center space-x-5'>
                                            <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                                            <p className='text-xs'>{item}</p>
                                        </div>
                                    )
                                }
                            </div>

                            <div className='cursor-pointer flex justify-center bg-gray-700 text-white rounded-full px-5 py-3'>
                                <span className="line-through italic">₹7,800.00</span>
                                <span className="px-5">₹6,800/year</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
