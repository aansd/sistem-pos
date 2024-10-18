import React, { useContext, useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { StoreContext } from '../../Context/StoreContext';

const AddressItem = ({ onSelect }) => {
  const { addresses, fetchAddresses, token } = useContext(StoreContext);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const loadAddresses = async () => {
      if (token) {
        await fetchAddresses();
      }
    };
    loadAddresses();
  }, [token]);

  const handleSelect = (event) => {
    const addressId = event.target.value;
    const address = addresses.find((addr) => addr._id === addressId);
    setSelectedAddress(addressId);
    onSelect(address); 
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Form.Group controlId="address-select">
            <Form.Label></Form.Label>
            <Form.Select
              value={selectedAddress}
              onChange={handleSelect}
            >
              <option value="">Pilih Alamat</option>
              {addresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.nama}, {address.provinsi}, {address.kabupaten}, {address.kecamatan} - {address.kelurahan}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default AddressItem;
