import { Button, Grid2 as Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../store/Auth/Action'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required")
})

const SigninForm = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
            console.log(values);
        }
    })

  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>

                <TextField 
                    fullWidth
                    label="Email"
                    name='email'
                    variant='outlined'
                    size='large'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <TextField 
                    fullWidth
                    label="Password"
                    name='password'
                    variant='outlined'
                    size='large'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

            </Grid>

            <Grid className='mt-8' size={{ xs: 12 }}>
                <Button fullWidth variant='contained' type='submit' size='large' sx={{ borderRadius: "29px", py: "15px", bgcolor: 'black' }}>
                    Sign in
                </Button>
            </Grid>

        </Grid>
    </form>
  )
}

export default SigninForm