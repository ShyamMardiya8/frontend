import  { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { REGISTER_USER } from '../controllers/functions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords do not match')
        .required('Please confirm your password'),
    }),
    onSubmit: (values, {resetForm}) => {
     REGISTER_USER(values) 
     resetForm()
      setTimeout(() => {
        navigate('/login')
      },1000)
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] px-4">
      <Card
        sx={{
          width: { xs: '100%', sm: 500 },
          p: 3,
          borderRadius: 4,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            className="text-center mb-6 font-semibold text-gray-800"
          >
            Create Your Account ✨
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email"
              name="email"
              type="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail
                      size={20}
                      className={
                        formik.touched.email && formik.errors.email
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} className="text-gray-500" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              margin="normal"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} className="text-gray-500" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={!formik.isValid}
              sx={{
                mt: 3,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#4338ca',
                },
              }}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
