import React, { useState } from 'react';
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Login submitted:', values);
      // You can add your login logic here
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
            Hello Again 👋
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email"
              type="email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
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
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
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
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            className="text-center mt-4 text-gray-600"
            sx={{ marginTop: '14px' }}
          >
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              className="text-[#4f46e5] font-medium hover:underline"
            >
              Sign up
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
