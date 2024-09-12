// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP and Reset Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/forgot-password', { email });
      setStep(2);
    } catch (error) {
      setError('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/forgot-password-mobile', { mobile });
      setStep(2);
    } catch (error) {
      setError('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/reset-password', { email, otp, newPassword });
      alert('Password reset successfully');
    } catch (error) {
      setError('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, textAlign: 'center' }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {step === 1 && (
        <>
          <Typography variant="h6">Forgot Password</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mobile (optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => email ? handleEmailSubmit() : mobile ? handleMobileSubmit() : alert('Please provide email or mobile')}
          >
            Send OTP
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <Typography variant="h6">Verify OTP and Reset Password</Typography>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </>
      )}
    </Box>
  );
};

export default ForgotPassword;
