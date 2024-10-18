import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import AddressItem from '../../components/AddressItem/AddressItem';
import Confirmation from '../../components/Confirmation/Confirmation';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InvoiceItem from '../../components/InvoiceItem/InvoiceItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {
  const [activeTab, setActiveTab] = useState('#first');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [invoiceData, setInvoiceData] = useState('');
  const { fetchAddresses, addresses, cartItems, mapCartItemsToPayload, url, deliveryFee, token, fetchInvoice } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAddress = localStorage.getItem('selectedAddress');
    const storedTab = localStorage.getItem('activeTab');

    

    if (storedTab) {
      setActiveTab(storedTab);
    } else {
      setActiveTab('#first');
    }

    if (cartItems && Object.keys(cartItems).length === 0) {
      fetchAddresses();
    }
  }, [cartItems, fetchAddresses]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const handleOrders = async () => {
    if (!selectedAddress || !selectedAddress._id) {
      alert("Silakan pilih alamat pengiriman terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/orders`,
        {
          delivery_fee: deliveryFee,
          delivery_address: selectedAddress._id, 
          items: mapCartItemsToPayload(cartItems),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Order Response:', response.data);  
      const orderId = response.data.order ? response.data.order._id : null; 
      localStorage.setItem('order_id', orderId);
      console.log('Order ID:', orderId);  
      
      if (orderId) {
        const invoice = await fetchInvoice(orderId);  
        setInvoiceData(invoice); 
        localStorage.setItem('invoiceData', JSON.stringify(invoice)); 
        handleTabChange('#third'); 
      } else {
        console.error('Order ID is undefined');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    localStorage.setItem('selectedAddress', JSON.stringify(address));
  };

  const handleNext = () => {
    if (activeTab === '#first' && selectedAddress) {
      handleTabChange('#second');
    } else if (activeTab === '#first' && !selectedAddress) {
        toast.error("Pilih alamat terlebih dahulu");
    }
  };

  const handleBack = () => {
    if (activeTab === '#third') {
      handleTabChange('#second');
    } else if (activeTab === '#second') {
      handleTabChange('#first');
    }
  };

  const handleOrderSubmission = () => {
    handleOrders();
  };

  const renderTabContent = () => {
    return (
      <>
        <div className={activeTab === '#first' ? '' : 'd-none'}>
          <Card.Title>Pilih 1 alamat Pengiriman</Card.Title>
          <AddressItem onSelect={handleAddressSelection} addresses={addresses} />
         <div className='mt-3 text-end'>
         <Button onClick={handleNext}>Next</Button>
         </div>
        </div>
        <div className={activeTab === '#second' ? '' : 'd-none'}>
          <Card.Title>Konfirmasi Pesanan</Card.Title>
          <Confirmation selectedAddress={selectedAddress} />
          <div className="d-flex justify-content-between w-100 mt-3">
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleOrderSubmission}>Bayar</Button>
          </div>
        </div>
        <div className={activeTab === '#third' ? '' : 'd-none'}>
          <Card.Title>Invoices</Card.Title>
          <InvoiceItem invoice={invoiceData} />
        </div>
      </>
    );
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
            <Nav.Item>
              <Nav.Link eventKey="#first" hidden={activeTab === '#second' || activeTab === '#third'}>
                Pilih Alamat
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#second" hidden={activeTab === '#first' || !selectedAddress || activeTab === '#third'}>
                Konfirmasi Pesanan
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#third" hidden={activeTab === '#first' || activeTab === '#second'}>
                Invoice
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {renderTabContent()} 
        </Card.Body>
      </Card>
    </div>
  );
};

export default CheckOut;
