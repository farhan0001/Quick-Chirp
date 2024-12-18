import { Button, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { registerUser } from '../../../store/Auth/Action'

const validationSchema = Yup.object().shape({
    fyllName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required")
})

const currentYear = new Date().getFullYear();
const years = Array.from({length: 100}, (_,i) => currentYear - i);
const days = Array.from({length: 12}, (_,i) => i+1);
const months = [
    {value: 1, label: "January"}, {value: 2, label: "February"}, {value: 3, label: "March"},
    {value: 4, label: "April"}, {value: 5, label: "May"}, {value: 6, label: "June"},
    {value: 7, label: "July"}, {value: 8, label: "August"}, {value: 9, label: "September"},
    {value: 10, label: "October"}, {value: 11, label: "November"}, {value: 12, label: "December"}
]

const SignupForm = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            dob: {
                date: '',
                month: '',
                year: ''
            }
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
            const {day, month, year} = values.dob;
            const dob = `${day}-${month}-${year}`;
            values.dob = dob;
            console.log(values);
        }
    });

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("dob", {
            ...formik.values.dob,
            [name]: event.target.value
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        label="Full Name"
                        name='fullName'
                        variant='outlined'
                        size='large'
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />

                </Grid>

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

                <Grid size={{ xs: 4 }}>
                    <InputLabel>Date</InputLabel>
                    <Select
                        name='day'
                        fullWidth
                        onChange={handleDateChange('day')}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob.day}
                    >
                        {days.map((day) => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid size={{ xs: 4 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                        name='month'
                        fullWidth
                        onChange={handleDateChange('month')}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob.month.value}
                    >
                        {months.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid size={{ xs: 4 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        name='year'
                        fullWidth
                        onChange={handleDateChange('year')}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob.year}
                    >
                        {years.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid className='mt-5' size={{ xs: 12 }}>
                    <Button fullWidth variant='contained' type='submit' size='large' sx={{ borderRadius: "29px", py: "12px", bgcolor: 'black' }}>
                        Sign up
                    </Button>
                </Grid>

            </Grid>
        </form>
    )
}

export default SignupForm