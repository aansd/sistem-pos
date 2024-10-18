import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge'; // Import Badge untuk menampilkan tag
import { StoreContext } from '../../Context/StoreContext';
import Tags from '../Tags/Tags';
import Container from 'react-bootstrap/esm/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductItem = () => {
    const { cartItems, removeFromCartAll, addToCart, url, fetchCartItems, food_list, token } = useContext(StoreContext);
    const [activeTags, setActiveTags] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleAddToCart = (productId) => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            toast.error("Silahkan login terlebih dahulu");
            return;
        }
        addToCart(productId);
    };

    const handleTagClick = (tags) => {
        setActiveTags(tags); 
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); 
    };

    
    const filteredProducts = food_list.filter(product => {
        const matchesTags = activeTags.length > 0 ? product.tags && activeTags.some(activeTag => product.tags.some(tag => tag._id === activeTag._id)) : true;
        const matchesSearch = product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTags && matchesSearch;
    });

    return (
        <div>
            <h2 className="mb-3">Products</h2>
            <Container className='mb-3'>
                <Tags onTagClick={handleTagClick} /> 
            </Container>
            <Container className='mb-3'>
                <Form.Control 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                />
            </Container>
            <Row>
                {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={`${url}/images/products/${product.image_url}`} alt='' />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>

                                    {/* Render tags */}
                                    <div className="mb-2">
                                        {product.tags && product.tags.length > 0 ? (
                                            product.tags.map(tag => (
                                                <Badge key={tag._id} pill bg="info" className="me-1">
                                                    {tag.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span>No tags available</span>
                                        )}
                                    </div>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                                    <ListGroup.Item>Category: {product.category ? product.category.name : 'No category'}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    {cartItems[product._id] ? (
                                        <Button variant="danger" onClick={() => removeFromCartAll(product._id)}>
                                            Delete from Cart
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleAddToCart(product._id)}>
                                            Add to Cart
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </Row>
        </div>
    );
};

export default ProductItem;
