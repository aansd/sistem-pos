import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import ProfileAddressItem from '../../components/ProfileAddressItem/ProfileAddressItem';
import ProfileOrder from '../../components/ProfileOrderItem/ProfileOrder';
import InvoiceItem from '../../components/InvoiceItem/InvoiceItem';

const Profile = () => {
  const [activeKey, setActiveKey] = useState('#first');

  // Ambil activeKey dari localStorage saat komponen di-mount
  useEffect(() => {
    const savedActiveKey = localStorage.getItem('activeKey');
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  // Simpan activeKey ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem('activeKey', activeKey);
  }, [activeKey]);

  const renderContent = () => {
    switch (activeKey) {
      case '#first':
        return <ProfileItem />;
      case '#second':
        return <ProfileAddressItem />;
      case '#third':
        return <ProfileOrder setActiveKey={setActiveKey} />; 
      case '#four':
        return <InvoiceItem />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="pills" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="#first">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#second">Address</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#third">Order</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#four" hidden={activeKey !== '#four'}>Invoice</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {renderContent()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
