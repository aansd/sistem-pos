import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoreContext } from '../../Context/StoreContext';

const Confirmation = ({ selectedAddress }) => {
    const { getTotalCartAmount,  deliveryFee,  } = useContext(StoreContext);

    return (
        <div >
            <Container>
                <Row>
                    <Col sm={4}>Alamat</Col>
                    <Col sm={8}>
                        {selectedAddress ? (
                            <div>
                                <strong>{selectedAddress.nama}</strong><br />
                                {selectedAddress.provinsi}, {selectedAddress.kabupaten}, {selectedAddress.kecamatan} - {selectedAddress.kelurahan}
                            </div>
                        ) : (
                            <p>Belum ada alamat yang dipilih.</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Sub Total</Col>
                    <Col sm={8}>Rp.{getTotalCartAmount()}</Col>
                </Row>
                <Row>
                    <Col sm={4}>Ongkir</Col>
                    <Col sm={8}>Rp.{deliveryFee}</Col>
                </Row>
                <Row>
                    <Col sm={4}>Total</Col>
                    <Col sm={8}>Rp.{getTotalCartAmount() + deliveryFee}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Confirmation;
