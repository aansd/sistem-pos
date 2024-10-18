import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Container, Row, Col, Breadcrumb, Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; 

const ProfileAddressItem = () => {
    const { addresses, fetchAddresses, token, deleteAddress, addAddress } = useContext(StoreContext);
    const [show, setShow] = useState(false);
    const [provinsiList, setProvinsiList] = useState([]);
    const [kabupatenList, setKabupatenList] = useState([]);
    const [kecamatanList, setKecamatanList] = useState([]);
    const [kelurahanList, setKelurahanList] = useState([]);
    
    // Form state
    const [formData, setFormData] = useState({
        nama: '',
        detail: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Fetch data Provinsi
    const fetchProvinsi = async () => {
        try {
            const response = await axios.get('https://ibnux.github.io/data-indonesia/provinsi.json');
            setProvinsiList(response.data);
        } catch (error) {
            console.error("Error fetching provinsi:", error);
        }
    };

    // Fetch Kabupaten berdasarkan Provinsi yang dipilih
    const fetchKabupaten = async (provinsiId) => {
        try {
            const response = await axios.get(`https://ibnux.github.io/data-indonesia/kabupaten/${provinsiId}.json`);
            setKabupatenList(response.data);
        } catch (error) {
            console.error("Error fetching kabupaten:", error);
        }
    };

    // Fetch Kecamatan berdasarkan Kabupaten yang dipilih
    const fetchKecamatan = async (kabupatenId) => {
        try {
            const response = await axios.get(`https://ibnux.github.io/data-indonesia/kecamatan/${kabupatenId}.json`);
            setKecamatanList(response.data);
        } catch (error) {
            console.error("Error fetching kecamatan:", error);
        }
    };

    // Fetch Kelurahan berdasarkan Kecamatan yang dipilih
    const fetchKelurahan = async (kecamatanId) => {
        try {
            const response = await axios.get(`https://ibnux.github.io/data-indonesia/kelurahan/${kecamatanId}.json`);
            setKelurahanList(response.data);
        } catch (error) {
            console.error("Error fetching kelurahan:", error);
        }
    };

    // Handle perubahan pada select Provinsi
    const handleProvinsiChange = (e) => {
        const selectedProvinsi = provinsiList.find(prov => prov.id === e.target.value);
        setFormData({ ...formData, provinsi: selectedProvinsi.nama });
        fetchKabupaten(e.target.value); 
    };
    
    const handleKabupatenChange = (e) => {
        const selectedKabupaten = kabupatenList.find(kab => kab.id === e.target.value);
        setFormData({ ...formData, kabupaten: selectedKabupaten.nama });
        fetchKecamatan(e.target.value); 
    };
    
    const handleKecamatanChange = (e) => {
        const selectedKecamatan = kecamatanList.find(kec => kec.id === e.target.value);
        setFormData({ ...formData, kecamatan: selectedKecamatan.nama });
        fetchKelurahan(e.target.value);
    };
    
    const handleKelurahanChange = (e) => {
        const selectedKelurahan = kelurahanList.find(kel => kel.id === e.target.value);
        setFormData({ ...formData, kelurahan: selectedKelurahan.nama });
    };

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nama: formData.nama,
                detail: formData.detail,
                provinsi: formData.provinsi,
                kabupaten: formData.kabupaten,
                kecamatan: formData.kecamatan,
                kelurahan: formData.kelurahan
            };
            await addAddress(payload);  
            handleClose(); 
        } catch (error) {
            console.error("Error adding address:", error);
        }
    };

    useEffect(() => {
        const loadAddresses = async () => {
            if (token) {
                await fetchAddresses();
            }
        };
        loadAddresses();
        fetchProvinsi();
        
    }, [token]);

    return (
        <Container fluid className="py-5" style={{ backgroundColor: 'white' }}>
            <Row>
                <Col>
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Button variant="primary" onClick={handleShow} className='mb-3'>
                Add Address
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Address Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" placeholder="Nama" name="nama" value={formData.nama} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Select className="mb-3" name="provinsi" onChange={handleProvinsiChange}>
    <option>Pilih Provinsi</option>
    {provinsiList.map((provinsi) => (
        <option key={provinsi.id} value={provinsi.id}>{provinsi.nama}</option>
    ))}
</Form.Select>
<Form.Select className="mb-3" name="kabupaten" onChange={handleKabupatenChange} disabled={!formData.provinsi}>
    <option>Pilih Kabupaten</option>
    {kabupatenList.map((kabupaten) => (
        <option key={kabupaten.id} value={kabupaten.id}>{kabupaten.nama}</option>
    ))}
</Form.Select>
<Form.Select className="mb-3" name="kecamatan" onChange={handleKecamatanChange} disabled={!formData.kabupaten}>
    <option>Pilih Kecamatan</option>
    {kecamatanList.map((kecamatan) => (
        <option key={kecamatan.id} value={kecamatan.id}>{kecamatan.nama}</option>
    ))}
</Form.Select>
<Form.Select className="mb-3" name="kelurahan" onChange={handleKelurahanChange} disabled={!formData.kecamatan}>
    <option>Pilih Kelurahan</option>
    {kelurahanList.map((kelurahan) => (
        <option key={kelurahan.id} value={kelurahan.id}>{kelurahan.nama}</option>
    ))}
</Form.Select>
                        <Form.Group className="mb-3">
                            <Form.Label>Detail</Form.Label>
                            <Form.Control as="textarea" rows={3} name="detail" value={formData.detail} onChange={handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Address
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <div className="">
                        <Table className="align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Detail</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addresses.map((address) => (
                                    <tr key={address._id}>
                                        <td>{address.nama}</td>
                                        <td>{address.provinsi}, {address.kabupaten}, {address.kecamatan} - {address.kelurahan}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteAddress(address._id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileAddressItem;
