import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbars = () => {
  const { cartItems, token, fetchCartItems, logout } = useContext(StoreContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
 
  const totalCartItems = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (token) {
        await fetchCartItems();
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [token]);

  
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false); 
    localStorage.removeItem('token'); 
    navigate('/'); 
        toast.success('berhasil logout');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand href="/">Pos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/cart" className='position-relative'>
                <i className="bi bi-cart4">
                  {totalCartItems > 0 && (
                    <span className="position-absolute top-30 start-70 translate-middle badge rounded-pill bg-danger">
                      {totalCartItems}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </i>
              </Nav.Link>
            
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/profile">
                    <i className="bi bi-person"></i>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                  <i class="bi bi-box-arrow-in-right"></i>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login">
                  <i className="bi bi-person"></i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
