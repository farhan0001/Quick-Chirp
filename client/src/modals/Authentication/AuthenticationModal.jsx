import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SigninForm from './Forms/SigninForm';
import SignupForm from './Forms/SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function AuthenticationModal({open, handleClose}) {

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = () => {
        const path = location.pathname === "/signup" ? "/signin" : "/signup";
        navigate(path);
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 className='text-center font-bold text-3xl pb-10'>
              { location.pathname === "/signup" ? "Join X today" : "Sign in to X" }
            </h1>
            { location.pathname === "/signup" ? <SignupForm /> : <SigninForm /> }
            <h1 className='text-center py-5 font-semibold text-[14px] text-gray-500'>
                { location.pathname === "/signup" ? "Already have account" : "Don't have an account?" }
            </h1>
            <Button fullWidth variant='outlined' onClick={handleNavigate} sx={{ color: "#1d9aee", borderRadius: "29px", py: "12px" }} >
                { location.pathname === "/signup" ? "Sign in" : "Sign up" }
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
