import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import logoFirst from '../../assets/images/1.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ChirpCard from '../Cards/Chirp/ChirpCard'
import { useDispatch, useSelector } from 'react-redux'
import { createChirp, getAllChirps } from '../../store/Chirp/Action'
import { uploadToCloudinary } from '../../utils/uploadToCloudinary'

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Chirp Text is requied")
})

const MainSection = () => {

    const [isImgUploading, setIsImgUploading] = useState(false);
    const [selectedImg, setSelecetdImg] = useState(null);
    const [showPostPending, setShowPostPending] = useState(false);
    const dispatch = useDispatch();
    const { chirp } = useSelector(store => store);

    const handleSubmit = (values, actions) => {
        dispatch(createChirp(values));
        console.log("Values: ", values);
        actions.resetForm();
        setSelecetdImg("");
    }

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            isChirp: true
        },
        onSubmit: handleSubmit,
        validationSchema
    });

    const handleSelectedImg = async (event) => {
        setIsImgUploading(true);
        const imgSrc = await uploadToCloudinary(event.target.files[0]);
        formik.setFieldValue("image", imgSrc);
        setSelecetdImg(imgSrc);
        setIsImgUploading(false);
    };

    const handlePostFetch = () => {
        setShowPostPending(false);
    };

    setInterval(() => {
        if (!showPostPending) {
            setShowPostPending(true);
        }
    }, 10000);

    useEffect(() => {
        dispatch(getAllChirps);
    }, [chirp.like, chirp.rechirp, dispatch, isImgUploading]);

    return (
        <div>
            <section className='h-10 hover:bg-[#f0f0f0] cursor-pointer border-b-[1.1px] border-gray-200 pb-3'>
                <h1 className='py-[10px] px-[47%] text-[14px] font-[Segoe UI] font-[700] opacity-90'>Home</h1>
            </section>
            <section className='pt-3'>
                <div className='flex space-x-2 pl-3 border-b-[1.1px] border-gray-200'>
                    <Avatar sx={{ width: "40px", height: "40px", minWidth: "0px", minHeight: "0px" }} alt='username' src={logoFirst} />
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='border-b-[1.1px] border-gray-200 pr-5'>
                                <textarea style={{ height: "64px", maxHeight: "120px" }} name='content' placeholder='What is happening?!'
                                    className='no-scrollbar w-full break-words border-none outline-none text-l bg-transparent pt-[6px] resize-none'
                                    {...formik.getFieldProps("content")} />
                                {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500 text-sm r-0'>{formik.errors.content}</span>
                                )}
                            </div>

                            <div>
                                {selectedImg && <img src={selectedImg} alt='Selected Post Content' />}
                            </div>

                            <div className='flex justify-between items-center mt-1 h-10'>
                                <div className="flex space-x-5 items-center">
                                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                        <ImageIcon fontSize='8px' className='text-[#529eeb] hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                        <input type='file' name='imgFile' className='hidden' onChange={handleSelectedImg}></input>
                                    </label>
                                    <FmdGoodIcon fontSize='8px' className='text-[#529eeb] cursor-pointer hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                    <TagFacesIcon fontSize='8px' className='text-[#529eeb] cursor-pointer hover:text-blue-500 hover:rounded-full hover:shadow-lg transition-all duration-300' />
                                </div>
                                <div className='mr-[14px] pb-1'>
                                    <Button
                                        sx={{ width: "52px", minWidth: "0px", height: "28.1px", borderRadius: "15px", paddingY: "14px", paddingX: "10px", bgcolor: 'black', color: 'white', fontWeight: "700", fontSize: "12px", fontFamily: "Segoe UI", '&:hover': { backgroundColor: '#2f3030' } }}
                                        variant='contained'
                                        type='submit'
                                    >
                                        <span className='capitalize'>Post</span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {
                showPostPending ?
                    <section onClick={handlePostFetch} className='text-center pt-[11px] h-[40px] border-b-[0.1px] border-gray-200 hover:bg-[#f6f7f6] cursor-pointer'>
                        <p className='text-[#1d9bf0] font-[400] text-[12px] font-[Segoe UI]'>Show 150 posts</p>
                    </section>
                    : <section></section>
            }
            <section>
                {chirp?.chirps?.map((value, index) => <ChirpCard key={index} item={value} />)}
            </section>
        </div>
    )
}

export default MainSection