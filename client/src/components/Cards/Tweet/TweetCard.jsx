import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import React, { Fragment, useState } from 'react'
import logoFirst from '../../../assets/images/1.jpg'
import { useNavigate } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyModal from '../../../modals/Reply/ReplyModal'
import { useDispatch } from 'react-redux'
import { createRetweet, likeTweet } from '../../../store/Tweet/Action'

const TweetCard = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [openReplyModal, setOpenReplyModal] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleTweetDelete = () => {
        handleClose();
    };
    const handleTweetEdit = () => {
        handleClose();
    };

    const handleOpenReplyTweetModal = () => setOpenReplyModal(true);
    const handleCloseReplyTweetModal = () => setOpenReplyModal(false);
    const handleReTweet = () => {
        dispatch(createRetweet(item?.id));
    }
    const handleTweetLike = () => {
        dispatch(likeTweet(item?.id));
    }
    const handleTweetViews = () => {

    }
    const handleTweetShare = () => {

    }

    return (
        <Fragment>
            {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
            <svg width="16px" height="16px" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
            <p>Repost</p>
        </div> */}
            <div className='flex space-x-2 pt-[14px] pl-3 mr-4'>
                <Avatar className='cursor-pointer' alt='username' src={logoFirst} onClick={() => navigate(`/profile/${item?.user?.id}`)} />
                <div className='w-full'>
                    <div className="flex justify-between items-start">
                        <div className="flex cursor-pointer items-center space-x-0.5 text-[14px]">
                            <span className='font-semibold font-[Segoe UI]'>{item?.user?.fullName}</span>
                            <span><VerifiedIcon sx={{ width: "18px", height: "18px" }} className='text-[#2e90f2]' /></span>
                            <span className='text-gray-600 font-[Arial] tranform translate-y-[1px]'>@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
                        </div>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                color='gray'
                                onClick={handleClick}
                                sx={{ width: "15px", paddingY: "0px", minWidth: "5px", maxWidth: "10px", minHeight: "0px", '&:hover': {backgroundColor: "#e9f0f5", borderRadius: "16px"} }}
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
                                <MenuItem className='space-x-[6px]' sx={{fontSize: "12px", fontFamily: "sans-serif", fontWeight: "700"}} onClick={handleTweetDelete}><span className='pb-[3px]'><DeleteIcon sx={{minWIdth: "0px", minHeight: "0px", width: "15px", height: "15px"}} /></span> <span className='items-center justify-center'>Delete</span></MenuItem>
                                <MenuItem className='space-x-[6px]' sx={{fontSize: "12px", fontFamily: "sans-serif", fontWeight: "700"}} onClick={handleTweetEdit}><span className='pb-[3px]'><EditIcon sx={{minWIdth: "0px", minHeight: "0px", width: "15px", height: "15px"}} /></span> <span className='items-center justify-center'>Edit</span></MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className='mt-2 ml-[10px] font-[Roboto]'>
                        <div onClick={() => navigate(`/tweet/${item?.id}`)} className='cursor-pointer text-[15px] m-[-10px]'>
                            <p className='mb-2'>{item?.content}</p>
                            <img className='w-[25rem] border border-gray-200 p-5 rounded-md' src={item?.image} alt='tweet-img'></img>
                        </div>
                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='space-x-[3px] flex items-center text-gray-600 text-[12px]'>
                                <ChatBubbleOutlineIcon sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleOpenReplyTweetModal} />
                                <p>{item?.totalReplies}</p>
                            </div>
                            <div className={`${item?.retweet ? "text-pink-600" : "text-gray-600"} space-x-[3px] flex items-center text-[12px]`}>
                                <RepeatIcon sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleReTweet} />
                                <p>{item?.totalRetweets}</p>
                            </div>
                            <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-[3px] flex items-center text-[12px]`}>
                                {item?.liked ? <FavoriteIcon  sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleTweetLike} /> :
                                    <FavoriteBorderIcon sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleTweetLike} />
                                }
                                <p>{item?.totalLies}</p>
                            </div>
                            <div className='space-x-[3px] flex items-center text-gray-600 text-[12px]'>
                                <BarChartIcon sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleTweetViews} />
                                <p>561</p>
                            </div>
                            <div className='space-x-[3px] flex items-center text-gray-600 text-[12px]'>
                                <FileUploadIcon sx={{width: "15px", height: "15px"}} className='cursor-pointer' onClick={handleTweetShare} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyTweetModal} />
            </section>
        </Fragment>
    )
}

export default TweetCard