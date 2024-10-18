import React, { useState, useContext } from 'react';
import { Tabs, Tab, Button, Form, Container, Card } from 'react-bootstrap'; 
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {
  const { login, register } = useContext(StoreContext); 
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await login(loginData); 
        if (response.success) {
            toast.success('Login berhasil!'); 
            navigate('/');  
        } else {
            toast.error('Login gagal: ' + response.message); 
        }
    } catch (error) {
        toast.error('Login gagal, periksa kembali data Anda.'); 
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await register(registerData); 
        if (response.success) {
            toast.success('Registrasi berhasil! Silahkan login.');
            setRegisterData({
                name: '',
                email: '',
                password: ''
            });
        } else {
            toast.error('Registrasi gagal: ' + response.message); 
        }
    } catch (error) {
        toast.error('Registrasi gagal, periksa kembali data Anda.'); 
    }
  };

  return (
    <Card>
      <Container className="p-5">
        {/* Tabs nav */}
        <Tabs defaultActiveKey="login" id="auth-tabs" className="mb-3" justify>
          <Tab eventKey="login" title="Login">
            {/* Login Form */}
            <Form onSubmit={handleLoginSubmit}>
              {/* Email input */}
              <Form.Group className="mb-4" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  name="email" 
                  value={loginData.email} 
                  onChange={handleLoginChange} 
                  required
                />
              </Form.Group>

              {/* Password input */}
              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={loginData.password} 
                  onChange={handleLoginChange} 
                  required
                />
              </Form.Group>

              {/* Submit button */}
              <Button variant="primary" type="submit" className="btn-block mb-4">
                Sign in
              </Button>
            </Form>
          </Tab>
          
          <Tab eventKey="register" title="Register">
            {/* Register Form */}
            <Form onSubmit={handleRegisterSubmit}>
              {/* Name input */}
              <Form.Group className="mb-4" controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter name" 
                  name="full_name" 
                  value={registerData.full_name} 
                  onChange={handleRegisterChange} 
                  required
                />
              </Form.Group>

              {/* Email input */}
              <Form.Group className="mb-4" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  name="email" 
                  value={registerData.email} 
                  onChange={handleRegisterChange} 
                  required
                />
              </Form.Group>

              {/* Password input */}
              <Form.Group className="mb-4" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  name="password" 
                  value={registerData.password} 
                  onChange={handleRegisterChange} 
                  required
                />
              </Form.Group>

              {/* Submit button */}
              <Button variant="primary" type="submit" className="btn-block mb-3">
                Sign up
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>
    </Card>
  );
}

export default LoginAndRegister;
