import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import logoFirst from '../../assets/images/1.jpg'
import { Avatar, Button } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../store/Tweet/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: "10px"
};

export default function ReplyModal({item, open, handleClose}) {

  const [isImgUploading, setIsImgUploading] = React.useState(false);
  const [selectedImg, setSelecetdImg] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReplySubmit = (values) => {
    handleClose();
    dispatch(createTweetReply(values));
  };
  const handleSelectedImg = (event) => {
    setIsImgUploading(true);
    const imgSrc = event.target.files[0];
    formik.setFieldValue("image", imgSrc);
    setSelecetdImg(imgSrc);
    setIsImgUploading(false);
  }

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      tweetId: item?.id
    },
    onSubmit: handleReplySubmit
  });

  React.useEffect(() => {}, [isImgUploading, selectedImg]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex space-x-2 pt-0 pl-2 mr-2'>
            <Avatar className='cursor-pointer' alt='username' src={logoFirst} onClick={() => navigate(`/profile/${5}`)} />
            <div className='w-full'>
              <div className="flex justify-between items-start">
                <div className="flex cursor-pointer items-center space-x-0.5 text-[14px]">
                  <span className='font-semibold font-[Segoe UI]'>Md Farhan Quamar</span>
                  <span><VerifiedIcon sx={{ width: "18px", height: "18px" }} className='text-[#2e90f2]' /></span>
                  <span className='text-gray-600 font-[Arial]'>@farhan123 . 2m</span>
                </div>
              </div>

              <div className='mt-2 ml-[10px] font-[Roboto]'>
                <div onClick={() => navigate(`/tweet/${3}`)} className='cursor-pointer text-[15px] m-[-10px]'>
                  <p className='mb-2'>Twitter Clone</p>
                </div>
              </div>
            </div>
          </div>

          <section className='pt-10'>
                <div className='flex space-x-2 pl-2 border-b-[1.1px] border-gray-200'>
                    <Avatar sx={{width: "40px", height: "40px", minWidth: "0px", minHeight: "0px"}} alt='username' src={logoFirst} />
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='border-b-[1.1px] border-gray-200 pr-5'>
                                <textarea style={{ height: "64px", maxHeight: "120px" }} name='content' placeholder='Post your reply'
                                    className='no-scrollbar w-full break-words border-none outline-none text-l bg-transparent pt-[6px] resize-none'
                                    {...formik.getFieldProps("content")} />
                                {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500 text-sm r-0'>{formik.errors.content}</span>
                                )}
                            </div>
                            {/* <div>
                            <img src='' alt='' />
                        </div> */}
                            <div className='flex justify-between items-center mt-1 h-10'>
                                <div className="flex space-x-5 items-center">
                                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                        <ImageIcon fontSize='12px' className='text-[#529eeb] text-[18px] hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                        <input type='file' name='imgFile' className='hidden' onChange={handleSelectedImg}></input>
                                    </label>
                                    <FmdGoodIcon fontSize='12px' className='text-[#529eeb] text-[20px] cursor-pointer hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                    <TagFacesIcon fontSize='12px' className='text-[#529eeb] text-[18px] cursor-pointer hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                </div>
                                <div className='mr-[14px] pb-1'>
                                    <Button
                                        sx={{ width: "65px", minWidth:"0px", height:"28.1px", borderRadius: "15px", paddingY: "14px", paddingX: "10px", bgcolor: 'black', color: 'white', fontWeight:"700", fontSize:"12px", fontFamily:"Segoe UI", '&:hover': { backgroundColor: '#2f3030' } }}
                                        variant='contained'
                                        type='submit'
                                    >
                                        <span>Reply</span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
}
