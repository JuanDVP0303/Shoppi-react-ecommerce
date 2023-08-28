import { Link, useParams } from "react-router-dom";
import { useShopiContext } from "../../Context/context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

function MyOrders() {
  const { order } = useShopiContext();

  return (
    <div className="flex flex-col items-center mb-10 relative">
      <h1 className="mb-10 font-bold text-xl">Your orders</h1>
      {order.map((product, index) => {
        return (
          <Link to={`/my-orders/${index}`} key={crypto.randomUUID()}>
            <article className="flex flex-col border-gray-100 shadow-md border-2 gap-2 px-20 mb-5 p-5 relative hover:scale-110 transition-transform duration-500 ">
              <p className="flex w-[140%]">
                <CalendarIcon /> Order date: {product.date}
              </p>
              <p className="flex"><DollarIcon/>Total price: {product.totalPrice}</p>
              <p className="flex">
                <ShoppingCartIcon className="w-6" />
                Total products: {product.totalProducts}
              </p>
              <span className="absolute top-[40%] right-[20px]">
              <RightArrow/>
              </span>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

export function OrderIndividual() {
  const { userId } = useParams();

  const { order } = useShopiContext();
  return (
    <div className="m-m-0-auto my-20 py-5 flex w-[80%] items-center flex-col gap-2 md:border md:border-slate-900 rounded-xl">
      <div className="flex relative">
        <Link to={"/my-orders"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute left-[-50px] top-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>

        <h1 className="text-2xl text-black text-center font-bold">
          Your order
        </h1>
      </div>
      <span className="font-bold py-2">
        You did this order at: {order.slice(userId, userId + 1)[0].date}
      </span>
      {order.length > 0 ? (
        order.slice(userId, userId + 1)[0].order.map((product) => {
          return (
            <article
              key={product.id}
              className="flex relative  w-[80%] h-[140px] border border-black overflow-hidden rounded-lg"
            >
              <figure className="border-r border-black p-2 w-[30%] flex justify-center flex-shrink-0">
                <img
                  src={product.image}
                  className="object-contain"
                  alt={product.title}
                />
              </figure>
              <p className="flex flex-col text-wrap items-center text-center gap-4 pb-4 m-m-0-auto">
                <span className="font-bold text-green-500">
                  {(product.price * product.quantity).toFixed(2)}$
                </span>
                {product.title}
              </p>
            </article>
          );
        })
      ) : (
        <h1>You do not have products yet</h1>
      )}
    </div>
  );
}

const CalendarIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
  
  );
};

const DollarIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
</svg>

  );
};

const RightArrow = ()  => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

}

export default MyOrders;
