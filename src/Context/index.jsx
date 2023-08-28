import propTypes from "prop-types";
import { useState } from "react";
import { shoppingCartContext } from "./context";
import { useEffect } from "react";
import { getProducts } from "../callApi";


function ShoppingCartProvider({ children }) {
  //Manejador del email en login, datos
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"))
  const [password, setPassword] = useState(localStorage.getItem("password"))

  //Get fetch products 
  const [itemsToGet, setItemsToGet] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setItemsToGet(data);
    };
    fetchData();
  }, []);


  //Product to show in product detail
  const [productToShow, setProductToShow] = useState({});
  const handleProductToShow = (object) => {
    setProductToShow(object);
  };

  //Show product detail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const handleIsProductDetailOpen = () => {
    setIsProductDetailOpen(!isProductDetailOpen);
  };
  // Shopping cart count
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };

  //Shopping cart add product
  const [cartProducts, setCartProducts] = useState([]);
  function addToList(e, objectToAdd) {
    const addInShoppingCart = (e, obj) => {
      e.stopPropagation();
      const newCart = { ...obj, quantity: 1 };
      handleCount(count + 1);
      setCartProducts([...cartProducts, newCart]);
      setIsProductDetailOpen(false);
    };

    if (cartProducts.length == 0) {
      addInShoppingCart(e, objectToAdd);
      return;
    }
    const isRepeat =
      cartProducts.filter((obj) => obj.id == objectToAdd.id).length > 0;
    if (isRepeat) return;
    addInShoppingCart(e, objectToAdd);
  }

  //Escalar carrito de compras al agregar un producto
  const [scaled, setScaled] = useState(false);
  useEffect(() => {
    setScaled(true);
    const escalar = setTimeout(() => {
      setScaled(false);
    }, 200);

    return () => {
      clearTimeout(escalar)
    }
  }, [count]);

  //Remover elementos del carrito
  const handleRemove = (id) => {
  document.getElementById(`${id}`).style.opacity = 0
    
    setTimeout(() => {
      const newCart = cartProducts.filter((obj) => obj.id != id);
      setCartProducts(newCart);
      setCount((curr) => curr - 1);
    }, 300)
    
  };

  //Aumentar cantidad de producto
  const handleQuantity = (id, operation) => {
    const productParam = cartProducts.filter((obj) => obj.id == id)[0];
    operation == "+"
      ? (productParam.quantity += 1)
      : (productParam.quantity -= 1);
  };

  const [updateTotalPrice, setUpdateTotalPrice] = useState(false);

//My orders Checkout
  const [order, setOrder] = useState([])
  
  
  return (
    <shoppingCartContext.Provider
      value={{
        email,
        setEmail,
        setFullName,
        fullName,
        setPassword,
        password,
        handleIsProductDetailOpen,
        itemsToGet,
        isProductDetailOpen,
        handleCount,
        productToShow,
        handleProductToShow,
        addToList,
        cartProducts,
        setCartProducts,
        handleRemove,
        count,
        setCount,
        scaled,
        handleQuantity,
        updateTotalPrice,
        setUpdateTotalPrice,
        setOrder,
        order
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

ShoppingCartProvider.propTypes = {
  children: propTypes.node,
};

export default ShoppingCartProvider;
