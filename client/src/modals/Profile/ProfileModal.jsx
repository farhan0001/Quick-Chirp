import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import coverImg from '../../assets/images/2.jpg';
import logoFirst from '../../assets/images/1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/Auth/Action';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: "10px"
};

export default function ProfileModal({ open, handleClose }) {

  const [imgUploading, setImgUploading] = React.useState(false);
  const [selectedImg, setSelecetdImg] = React.useState("");
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log(values);
    setSelecetdImg("");
    handleClose();
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: ""
    },
    onSubmit: handleSubmit
  });

  const handleImgChange = async(event) => {
    setImgUploading(true);
    const { name } = event.target;
    const file = await uploadToCloudinary(event.target.files[0]);
    setSelecetdImg(file);

    formik.setFieldValue(name, file);

    setImgUploading(false);
  }

  React.useEffect(() => {}, [imgUploading]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between transform -translate-y-3'>
              <IconButton className='transform -translate-x-4' onClick={handleClose} aria-label='delete'>
                <CloseIcon />
              </IconButton>
              <p className=''>Edit Profile</p>
              <Button className='transform translate-x-4' type='submit'>Save</Button>
            </div>
            <div className='no-scrollbar overflow-y-scroll overflow-x-hidden h-[70vh]'>
              <React.Fragment>
                <div className='w-full'>
                  <div className='relative'>
                    <img className='w-full h-[8.5rem] object-cover object-center' src={coverImg} alt="" />
                    <input type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                      name='coverImage' onChange={handleImgChange} />
                  </div>
                </div>

                <div className='w-full transform -translate-y-14 ml-4 h-[4rem]'>
                  <div className="relative">
                    <Avatar sx={{ width: "7rem", height: "7rem", border: "3px solid white" }} src={ selectedImg || auth?.user?.image || logoFirst } />
                    <input className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                      type='file' name='userImage' onChange={handleImgChange} />
                  </div>
                </div>
              </React.Fragment>

              <div className="space-y-3">
                <TextField
                  fullWidth
                  id='fullName'
                  name='fullName'
                  label="Full Name"
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: "14px",
                      height: "45px"
                    },

                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                      transform: 'translate(13px, 13px)'
                    },

                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      fontSize: '10px',
                      transform: 'translate(14px, -8px)',
                    },
                  }}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id='bio'
                  name='bio'
                  label="Brief Bio"
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: "14px",
                      height: "100px"
                    },

                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                      transform: 'translate(13px, 13px)'
                    },
                    
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      fontSize: '10px',
                      transform: 'translate(14px, -8px)',
                    },
                  }}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />

                <TextField
                  fullWidth
                  id='website'
                  name='website'
                  label="Website"
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: "14px",
                      height: "45px"
                    },

                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                      transform: 'translate(13px, 13px)'
                    },
                    
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      fontSize: '10px',
                      transform: 'translate(14px, -8px)',
                    },
                  }}
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />

                <TextField
                  fullWidth
                  id='location'
                  name='location'
                  label="Location"
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: "14px",
                      height: "45px"
                    },

                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                      transform: 'translate(13px, 13px)'
                    },
                    
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      fontSize: '10px',
                      transform: 'translate(14px, -8px)',
                    },
                  }}
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className='my-3'>
                  <p className='text-[14px]'> Birth Date . Edit</p>
                  <p className='text-[14px]'>December 15, 2000</p>
                </div>

                <p className='py-3 text-[14px]'>Edit Professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}