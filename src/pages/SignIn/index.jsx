import { useNavigate } from "react-router-dom";
import { useShopiContext } from "../../Context/context";

function SignIn() {
  const navigate = useNavigate();
  const { setEmail, setFullName, setPassword } = useShopiContext();
  const handleLogin = (e) => {
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e.target.children[1].childNodes[1].value
    const fullName = e.target.children[0].childNodes[1].value
    const password = e.target.children[2].childNodes[1].value
  const isDataInOrder = email && password && fullName ? true : false
    e.preventDefault();
    if(!isDataInOrder){
      alert("Fill the fields correctly")
      return
    }
    if(!verifyEmail.test(email)) return
      setFullName(fullName);
      setEmail(email);
      setPassword(password);
      navigate("/home");    
  };

  return (
    <section className="w-full h-screen flex justify-center items-center ">
      <div className=" border border-gray-400 rounded-lg w-[50vmax] h-[80vmax] md:h-[40vmax]">
        <div className="flex justify-center mt-8">
          <h1 className="text-2xl md:text-3xl font-bold ">
            Login to <span className="font-bold text-green-500">Shop</span>
            <span className="font-bold text-amber-950">pi!</span>
          </h1>
        </div>
            
        <form onSubmit={handleLogin}  className="flex justify-center h-auto flex-col p-5 text-center gap-2">
          <div className="flex flex-col md:items-center">
            <label htmlFor="name">Name and lastname</label>
            <input
            required
              id="name"
              autoComplete="none"
              className="border p-1 border-gray-400 rounded-lg md:w-[60%]"
              type="text"
            />
          </div>
          <div className="flex flex-col md:items-center">
            <label htmlFor="email">Email</label>
            <input
            required
              id="email"
              autoComplete="none"

              className="border p-1 border-gray-400 rounded-lg md:w-[60%]"
              type="email"
            />
          </div>
          <div className="flex flex-col md:items-center">
            <label htmlFor="password">Password</label>
            <input
            required
              id="password"
              type="password"
              autoComplete="none"

              className="border p-1 md:w-[60%] border-gray-400 rounded-lg"
            />
          </div>
          <button
            id="button"
            className="border border-slate-700 bg-slate-600 text-white rounded-lg mt-10 p-3 md:w-[60%] m-m-0-auto"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
