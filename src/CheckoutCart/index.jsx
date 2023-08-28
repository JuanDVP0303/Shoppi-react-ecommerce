import { useShopiContext } from "../Context/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./styles.css";
import { useState } from "react";
import propTypes from "prop-types";
import {useEffect} from "react"
export default function CheckCart() {
  const { cartProducts, updateTotalPrice, setOrder, order, setCartProducts, setCount } = useShopiContext();
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    if(cartProducts.length == 0) {
      return
    }  
    let priceToShow = 0
    cartProducts.forEach(item => {
      const productPrice = item.price * item.quantity
      priceToShow += productPrice
    })
    setTotalPrice(priceToShow.toFixed(2))
 
  }, [cartProducts, updateTotalPrice])
  
  const handleCheckout = () => {
    if(cartProducts.length == 0) return 
   const date = new Date
    const orderToAdd = {
    date: date.toLocaleDateString(),
      order: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice
    }
    setOrder([...order, orderToAdd])
    setCartProducts([])
    setCount(0)
  }

  return (
    <section
      className={`h-auto my-20  mx-2 flex flex-col justify-center bg-white/90 md:border  md:border-black rounded-lg min-h-[300px]  `}
    >
      <div className="text-4xl font-bold flex w-full justify-center p-5 m-m-0-auto">
        <h2>Shopping cart</h2>
      </div>

      {cartProducts.length == 0 ? (
        <h2 className="text-center font-light">
          You do not have products yet.
        </h2>
      ) : (
        cartProducts.map((obj) => {
          return <CartProductData key={obj.id} obj={obj} />;
        })
      )}
      {cartProducts.length == 0 || totalPrice == 0 ? null : (
        <span className={"font-bold text-xl text-center m-m-0-auto py-10"}>Total price of your products: ${totalPrice}</span>
        )}
        <div className="flex justify-center w-full py-8">
        <button onClick={handleCheckout} className="border border-slate-800 bg-slate-500 text-white py-3 w-[50%] rounded-lg cursor-pointer">Checkout</button>
        </div>
    </section>
  );
}


 const CartProductData = ({ obj }) => {
  const { handleQuantity } = useShopiContext();
  const { image, title, price, quantity, id } = obj;
  const [quantities, setQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(quantities * price)
  
  const changeQuantity = (id, operation) => {
    handleQuantity(id, operation);
    if (operation == "+") {
      setQuantity((curr) => curr + 1);
    }
    if (operation == "-") {
      setQuantity((curr) => curr - 1);
    }
  };

  const { handleRemove, setUpdateTotalPrice, updateTotalPrice } = useShopiContext();
  return (
    <figure className="w-full h-full flex  flex-wrap flex-col justify-center items-center gap-16 mb-5  ">
      <article
        id={`${id}`}
        className="flex relative w-[90%] transition-all duration-300 h-[200px] border border-black overflow-hidden rounded-lg"
      >
        <XMarkIcon
          onClick={() => handleRemove(id)}
          className="absolute top-2 right-2 w-8 h-8 hover:cursor-pointer"
        />
        <figure className="border-r border-black p-2 w-[30%] flex justify-center">
          <img src={image} className="object-contain" alt={title} />
        </figure>
        <div className="mt-6 w-full">
          <p className="flex flex-col flex-wrap items-center text-center gap-4 p-2">
            <span className="font-bold text-green-500">
              {(totalPrice).toFixed(2)}$
            </span>
            {title}
          </p>
          <div className="flex mt-2 justify-center">
            <p className="mr-2">Product quantity: </p>
            <button
              onClick={() => {
                changeQuantity(id, "+");
                setTotalPrice(curr => curr + price)
                setUpdateTotalPrice(!updateTotalPrice)
              }}
            >
              {" "}
              +
            </button>
            <span className="bg-slate-400 px-1 mx-2 text-white">
              {quantities}
            </span>
            <button
              onClick={() => {
                if(quantities == 1) return
                changeQuantity(id, "-");
                setTotalPrice(curr => curr - price)
                setUpdateTotalPrice(!updateTotalPrice)

              }}
            >
              -
            </button>
          </div>
        </div>
      </article>
    </figure>
  );
};

CartProductData.propTypes = {
  obj: propTypes.object.isRequired,
};
