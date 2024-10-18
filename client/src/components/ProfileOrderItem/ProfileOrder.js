import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, Table, Button } from "react-bootstrap";
import { StoreContext } from "../../Context/StoreContext";

const ProfileOrder = ({ setActiveKey }) => { 
  const { order, fetchOrder, fetchInvoice, token } = useContext(StoreContext);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
        if (token) {
            await fetchOrder();
        }
    }; 
    loadOrder()
}, [token]);


  const handleShowInvoice = async (orderId) => {
    setSelectedOrderId(orderId);
    await fetchInvoice(orderId);
    setActiveKey('#four'); 
  };

  return (
    <div>
      <section style={{ backgroundColor: "white" }}>
        <Container className="py-5">
          <Row>
            <Col>
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item active>Order Information</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <Row>
            <Col>
              <Table className="align-middle" responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {order && order.length > 0 ? (
                    order.map((orderItem) => (
                      <tr key={orderItem._id}>
                        <td>#{orderItem.order_number}</td>
                        <td>
                          Rp. {orderItem.delivery_fee + (orderItem.order_items?.reduce((total, item) => total + (item.price * item.qty), 0) || 0)}
                        </td>
                        <td>{orderItem.status}</td>
                        <td>
                          <Button onClick={() => handleShowInvoice(orderItem._id)}>
                            Show
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ProfileOrder;
