import React, { useRef, useState } from 'react';
import { navigationMenu } from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import firstlogo from '../../assets/images/1.jpg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/Auth/Action';

const Navigation = () => {

    const navigate = useNavigate();
    const menuButtonRef = useRef();
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    };
    const handleDivClick = () => {
        if (!anchorEl) {
            menuButtonRef.current.click();
        }
    }

    return (
        <div className='h-screen sticky top-0'>
            <div>
                <div className='pt-[9px] pb-2.5 pl-2'>
                    <svg height="24" width="24" viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.62 0 3.138-.487 4.422-1.318l1.573 1.573c.39.39 1.025.39 1.415 0s.39-1.025 0-1.415l-1.573-1.573c.83-1.284 1.318-2.802 1.318-4.422 0-4.418-3.582-8-8-8zm0 2c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z" />
                            <path d="M16.5 12c0-2.481-2.019-4.5-4.5-4.5-.552 0-1 .448-1 1s.448 1 1 1c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5c-.552 0-1 .448-1 1s.448 1 1 1c2.481 0 4.5-2.019 4.5-4.5z" />
                        </g>
                    </svg>
                </div>
                <div className='pl-2'>
                    {
                        navigationMenu.map((item, index) =>
                            <div key={index} className='cursor-pointer w-full flex space-x-1 items-center pb-[7.8px] pt-[8px] hover:rounded-[30px] hover:bg-[#e8ebe9]'
                                onClick={() => item.title === 'Profile' ? navigate(`/profile/${auth?.user?.id}`) : navigate(item.path)}
                            >
                                <span>{item.icon}</span>
                                <p className='text-[17px] pl-[10px] font-[400]'>{item.title}</p>
                            </div>
                        )
                    }
                </div>
                <div className='py-6'>
                    <Button
                        sx={{ width: "90%", borderRadius: "30px", py: "10px", bgcolor: 'black', color: 'white', '&:hover': { backgroundColor: '#2f3030' } }}
                        variant='contained'
                    >
                        <span className='text-[12.5px] font-[700] capitalize'>Post</span>
                    </Button>
                </div>
                <div className='flex items-center justify-between h-[55px] space-x-3 mr-0 pl-0 hover:rounded-[30px] hover:bg-[#e8ebe9] cursor-pointer' onClick={handleDivClick}>
                    <div className='flex items-center'>
                        <div className='w-[20%]'>
                            <Avatar alt='Md Farhan Quamar' src={firstlogo} />
                        </div>
                        <div className='flex flex-col w-[100%] ml-2 mr-3 pr-4'>
                            <span className='text-[12px] font-[650]'>{auth.user?.fullName}</span>
                            <span className='text-[14px] opacity-60'>@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                        </div>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ width: "10px", minWidth: "5px", maxWidth: "10px" }}
                                ref={menuButtonRef}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation