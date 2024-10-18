import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Container, Row, Col, Card, Breadcrumb} from 'react-bootstrap'; // Import komponen dari react-bootstrap
const ProfileItem = () => {
    const { user, fetchUser, token } = useContext(StoreContext);
    
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                await fetchUser();
            }
        }; 
        loadUser()
    }, [token]);
    
    return (
        <Container fluid className="py-5" style={{ backgroundColor: 'white' }}>
            <Row>
                <Col>
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Full Name</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">{user.full_name || 'N/A'}</p> {/* Menampilkan nama lengkap */}
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={3}>
                                    <p className="mb-0">Email</p>
                                </Col>
                                <Col sm={9}>
                                    <p className="text-muted mb-0">{user.email || 'N/A'}</p> {/* Menampilkan email */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileItem;
