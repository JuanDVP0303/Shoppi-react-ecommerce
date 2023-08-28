import "./styles.css";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useShopiContext } from "../Context/context";
export default function ProductDetail() {
  const { handleIsProductDetailOpen, isProductDetailOpen, productToShow } =
    useShopiContext();
  const { title, price, image } = productToShow;

 
  return (
    <aside
      className={`productDetail fixed w-[90%] md:w-[60%] top-12 ${
        isProductDetailOpen ? "block" : "hidden"
      } z-10 bg-white/90 border border-black rounded-lg`}
    >
      <div className="flex justify-between p-5">
        <h2>Product details</h2>
        <XCircleIcon className="h-6 w-6" onClick={handleIsProductDetailOpen} />
      </div>
      <figure className="w-full h-full flex flex-col items-center  ">
        <img src={image} className="w-[60%] h-[40%] object-contain " alt={title} />
        <div className="mt-6">
          <p className="flex flex-col flex-wrap items-center text-center gap-4 p-2">
          <span className="font-bold text-green-500">
              {price}$ 
            </span>
            {title}
          </p>

          
        </div>
      </figure>
    </aside>
  );
}
