import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFootList] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [tag, setTag] = useState([]);
  const deliveryFee = 20000;
  const mapCartItemsToPayload = (cart) => {
    return Object.keys(cart).map((key) => ({
      product: { _id: key },
      qty: cart[key],
    }));
  };

  const addToCart = async (itemId) => {
    let updatedCart;
    if (!cartItems[itemId]) {
      updatedCart = { ...cartItems, [itemId]: 1 };
    } else {
      updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    }
    setCartItems(updatedCart);
    try {
      await axios.put(
        `${url}/api/carts`,
        { item: mapCartItemsToPayload(updatedCart) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to update cart on server:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      let updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
      setCartItems(updatedCart);
      try {
        await axios.put(
          `${url}/api/carts`,
          { item: mapCartItemsToPayload(updatedCart) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to update cart on server:", error);
      }
    }
  };

  const removeFromCartAll = async (itemId) => {
    if (cartItems[itemId] > 0) {
      let updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
      try {
        await axios.put(
          `${url}/api/carts`,
          { item: mapCartItemsToPayload(updatedCart) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to update cart on server:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item dengan ID ${item} tidak ditemukan di food_list.`);
        }
      }
    }
    return totalAmount;
  };

  const fetchCartItems = async () => {
    if (token) {
      try {
        const response = await axios.get(`${url}/api/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = response.data;
        const cartData = {};
        items.forEach((item) => {
          cartData[item.product._id] = item.qty;
        });
        setCartItems(cartData);
      } catch (error) {
        console.error("Gagal mengambil item keranjang:", error);
      }
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${url}/api/delivery-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const addressData = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setAddresses(addressData);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const addAddress = async (addressData) => {
    try {
      const response = await axios.post(
        `${url}/api/delivery-address`,
        addressData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Address added:", response.data);

      await fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${url}/api/delivery-address/${addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orders = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setOrder(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvoice = async (orderId) => {
    try {
      const response = await axios.get(`${url}/api/invoices/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoice(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const fetchProductDetails = async (itemIds) => {
    try {
      const productDetails = await Promise.all(
        itemIds.map((id) =>
          axios
            .get(`${url}/api/products/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.data)
        )
      );
      return productDetails;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return [];
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${url}/auth/logout`);
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const register = async (registerData) => {
    try {
      const response = await axios.post(`${url}/auth/register`, registerData);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        console.log(response.data);
        console.log("Register successful:", response.data.message);
        return { success: true, message: response.data.message };
      } else {
        console.error("Register failed:", response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Terjadi kesalahan saat registrasi. Silakan coba lagi.";
      console.error("Error during registration:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(`${url}/auth/login`, loginData);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        console.log("Login successful:", response.data.message);
        return { success: true, message: response.data.message };
      } else {
        console.error("Login failed:", response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error during login:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const fetchFootList = async () => {
    const response = await axios.get(`${url}/api/products`);
    setFootList(response.data.data);
  };

  const fetchTags = async () => {
    const response = await axios.get(`${url}/api/tags`);
    setTag(response.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFootList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await fetchUser();
        await fetchCartItems();
        await fetchAddresses();
      }
      await fetchTags();
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchCartItems,
    removeFromCartAll,
    fetchAddresses,
    addresses,
    deliveryFee,
    mapCartItemsToPayload,
    fetchInvoice,
    invoice,
    fetchUser,
    user,
    deleteAddress,
    addAddress,
    fetchOrder,
    order,
    fetchProductDetails,
    logout,
    register,
    login,
    fetchTags,
    tag,
    setCartItems
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
