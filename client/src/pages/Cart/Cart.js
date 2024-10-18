import Table from "react-bootstrap/Table";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    fetchCartItems,
    removeFromCartAll,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (token) {
      localStorage.setItem('activeTab', '#first'); 
      navigate('/checkout'); 
    } else {
      Toast.warning('Silahkan login');
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      if (token) {
        await fetchCartItems();
      }
    };
    loadCartItems();
  }, [token]);

  const cartIsEmpty = Object.keys(cartItems).length === 0; // Cek apakah cart kosong

  return (
    <div>
      <h2 className="mb-5">Cart</h2>
      <h4>Sub Total: Rp.{getTotalCartAmount()}</h4>
      <Table striped>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cartItems).map((itemId) => {
            const product = food_list.find((item) => item._id === itemId);
            return product ? (
              <tr key={itemId}>
                <td>
                  <img
                    src={`${url}/images/products/${product.image_url}`}
                    alt={product.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>Rp.{product.price}</td>
                <td className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => removeFromCart(itemId)}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{cartItems[itemId]}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => addToCart(itemId)}
                  >
                    +
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCartAll(itemId)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </Table>
      {/* Tampilkan tombol Check Out hanya jika keranjang tidak kosong */}
      {!cartIsEmpty && <Button onClick={handleCheckout}>Check Out</Button>}
    </div>
  );
};

export default Cart;
