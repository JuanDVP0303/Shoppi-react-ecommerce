import propTypes from "prop-types";
import { useState } from "react";
import { useShopiContext } from "../Context/context";
import { useEffect } from "react";
const Card = ({ category, name, price, image, functionToClick, id }) => {
  const {cartProducts } = useShopiContext()
  const [showProductDetail, addToList] = functionToClick;
  const carIsRepeated = cartProducts.filter(item => item.id == id).length > 0
  const [isInShoppingCart, setIsInShoppingCart] = useState(carIsRepeated)
  
  useEffect(() => {
    const carIsRepeated = cartProducts.filter(item => item.id == id).length > 0
    setIsInShoppingCart(carIsRepeated)
  }, [cartProducts, id])

  const showCheck = (isTrue) => {
    if (isTrue) {
      return <Check />;
    } else {
      return <Plus />;
    }
  };

  return (
    <div className="cursor-pointer w-56 h-60 rounded-md bg-blue-100/80 tCheck-ellipsis">
      <figure
        onClick={showProductDetail}
        className="relative mb-2 w-full h-4/5 z-1"
      >
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-2">
          {category}
        </span>
        <img
          src={image}
          alt="Headphones"
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={(e) => {
              addToList(e)
              
          }}
          className="absolute top-0 bg-white m-2 right-0 flex justify-center items-center rounded-full w-8 h-8 z-2"
        >
          {showCheck(isInShoppingCart)}
        </button>
      </figure>
      <p className="flex justify-between px-2 ">
        <span className="text-sm font-light h-10 truncate  px-2">{name}</span>
        <span className="text-lg font-bold">{price}$</span>
      </p>
    </div>
  );
};

function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full pointer-events-none bg-slate-700 rounded-full text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>

  );
}

Card.propTypes = {
  category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  functionToClick: propTypes.array.isRequired,
};

export default Card;
