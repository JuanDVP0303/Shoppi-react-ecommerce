import { useNavigate } from "react-router-dom";
import { useShopiContext } from "../../Context/context";
import { useRef, useState } from "react";
import propTypes from "prop-types";

const AccountForm = () => {
  const [userWantAccount, setUserWantAccount] = useState(false);
  return (
    <div>
      {userWantAccount ? (
        <SignIn setUserWantAccount={setUserWantAccount} />
      ) : (
        <LogIn setUserWantAccount={setUserWantAccount} />
      )}
    </div>
  );
};

function SignIn({ setUserWantAccount }) {
  const navigate = useNavigate();
  const {    setUserData, setActualUser, allUsers } = useShopiContext();
  const refForm = useRef(null);

  const handleLogin = (e) => {
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = refForm.current.children[1].childNodes[1].value;
    const fullName = refForm.current.children[0].childNodes[1].value;
    const password = refForm.current.children[2].childNodes[1].value;
    const confirmPassword = refForm.current.children[3].childNodes[1].value;
    e.preventDefault();

    const emailAlreadyExist = allUsers.filter(item => item.email == email)
    if(emailAlreadyExist.length > 0) {
      alert("Ese email ya existe")
      return
    }

    if (!verifyEmail.test(email) || confirmPassword != password) return;
    const data = {fullName, email, password}
    setActualUser(data)
    setUserData(data)
    
    navigate("/home");
  };

  return (
    <section className="w-full h-auto flex justify-center items-center mt-10 ">
      <div className=" border border-gray-400 rounded-lg w-[50vmax] mb-10">
        <div className="flex justify-center mt-8">
          <h1 className="text-2xl md:text-3xl font-bold ">
            Sign in to <span className="font-bold text-green-500">Shop</span>
            <span className="font-bold text-amber-950">pi!</span>
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          ref={refForm}
          className="flex justify-center h-auto flex-col p-5 text-center gap-2"
        >
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
          <div className="flex flex-col md:items-center">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              required
              id="confirmPassword"
              type="password"
              autoComplete="none"
              className="border p-1 md:w-[60%] border-gray-400 rounded-lg"
            />
          </div>
          <button
            id="button"
            className="border border-slate-700 bg-slate-600 text-white rounded-lg p-3 mt-10 md:w-[60%] m-m-0-auto"
          >
            Sign in
          </button>
        </form>
        <div className="flex justify-center pb-3">
        <button
          onClick={() => {
            setUserWantAccount(false);
          }}
        >
          Have you got an account already?
        </button>
        </div>
      </div>
    </section>
  );
}

const LogIn = ({ setUserWantAccount }) => {
const {allUsers, setActualUser} = useShopiContext()
const navigate = useNavigate()
const refForm = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault()
    const email = refForm.current.children[0].childNodes[1].value;
    const password = refForm.current.children[1].childNodes[1].value;

    const emailAlreadyExist = allUsers.filter(item => item.email == email)
    const isPasswordCorrect = emailAlreadyExist.length > 0 ? emailAlreadyExist.filter(item => item.password == password) : null

    if(emailAlreadyExist.length == 0) {
      alert("Ese email no existe")
      return
    }
    if(isPasswordCorrect.length == 0){
      alert("La contraseña no coincide con el correo")
      return
    }

    setActualUser(emailAlreadyExist[0])
    navigate("/home");
  };
  return (
    <section className="w-full h-auto flex justify-center items-center mt-10 ">
      <div className=" border border-gray-400 rounded-lg w-[50vmax] h-[80vmax] md:h-[40vmax]">
        <div className="flex justify-center mt-8">
          <h1 className="text-2xl md:text-3xl font-bold ">
            Log in to <span className="font-bold text-green-500">Shop</span>
            <span className="font-bold text-amber-950">pi!</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} ref={refForm} className="flex justify-center h-auto flex-col p-5 text-center gap-2">
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
            Login in
          </button>
        </form>
        <div className="flex justify-center">
        <button
          onClick={() => {
            setUserWantAccount(true);
          }}
        >
          Have you not got have an account already?
        </button>
        </div>
      </div>
    </section>
  );
};

export default AccountForm;

SignIn.propTypes = {
  setUserWantAccount: propTypes.func.isRequired,
};

LogIn.propTypes = {
  setUserWantAccount: propTypes.func.isRequired,
};
