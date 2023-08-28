import { useRoutes, BrowserRouter,  } from "react-router-dom";
import {OrderIndividual} from "../My orders/MyOrders";
import propTypes from "prop-types";
import Navbar from "../../components/Navbar";
import Home from "../home";
import MyAccount from "../MyAccount";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import ShoppingCartProvider from "../../Context";
import CheckCart from "../../CheckoutCart/index";
import MyOrder from "../My orders/MyOrders"
import "./App.css";
import Categories from "../AllCategories";
import { useShopiContext } from "../../Context/context";


const Layout = ({ children }) => {
  const {email,password, fullName} = useShopiContext()
  const isDataInOrder = email && password && fullName ? true : false
  return (
    <>
    {isDataInOrder ? (
      <>
      <Navbar />
      {children}
      </>
    ) : (
    <SignIn/>)
    
    }
      
    </>
  );
};

Layout.propTypes = {
  children: propTypes.element,
};

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },

    {
      path: "/category/:category",
      element: <Categories />
    }, 

    {
      path: "/my-orders",
      element: <MyOrder />,
    },
    {
      path: "/my-orders/:userId",
      element: <OrderIndividual/>,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
    {
      path: "/shopping-cart",
      element: <CheckCart />,
    },
  ]);

  return routes;
};

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Layout>
          <div className="mt-12 ">{<AppRoutes />}</div>
        </Layout>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
