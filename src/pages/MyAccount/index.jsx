import { useShopiContext } from "../../Context/context"

function MyAccount() {
  const {actualUser, order} = useShopiContext()  
  if(!actualUser) return
  return (
      <section className="flex justify-center items-center mt-20">
          <div className="grid  items-center text-center border border-gray-600 rounded-lg h-[80vmax] md:h-[80vmin] w-[60vmax]">
            <h1 className=" text-center font-bold text-2xl py-5">Welcome <span className="text-green-500">{actualUser.fullName}</span>!</h1>
            <div className="mx-2 justify-self-center h-full">
            <p className="mb-5"><span className="font-light">Your email is</span> : {actualUser.email}</p>
            <p className="mb-5"><span className="font-light">Your password is</span> : {actualUser.password}</p>
            <p className="mb-5">You have <span className="font-bold" >{order.length}</span> orders</p>
            </div>
          </div>
      </section>
    )
  }
  
  export default MyAccount