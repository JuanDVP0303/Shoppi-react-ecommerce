import { NavLink } from "react-router-dom";
import propTypes from "prop-types";
import { useShopiContext } from "../Context/context";
import { getProducts } from "../callApi";
import { useEffect } from "react";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const NavItem = ({ activeStyle, to, children, isCategory, onClick }) => {
  const mobileView = isCategory ? "hidden lg:block" : null;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `${isCategory ? mobileView : ""} ${
          isActive ? { activeStyle } : ""
        }`;
      }}
      onClick={() => onClick(false)}
    >
      {children}
    </NavLink>
  );
};

NavItem.propTypes = {
  activeStyle: propTypes.string,
  to: propTypes.string,
  children: propTypes.node,
  isCategory: propTypes.bool,
  onClick: propTypes.func
};

function Navbar() {
  const { order } = useShopiContext();
  const { count, scaled, email } = useShopiContext();
  const [categories, setCategories] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const activeStyle = "underline font-bold underline-offset-4";

  const handleIsShow = (showOrNot) => {
    if(showOrNot == false) {
      setIsShow(false)
      return
    }
    setIsShow(!isShow);
  };

  useEffect(() => {
    const get = async () => {
      const getCategories = async () => {
        const res = await getProducts();
        const categoriesToPush = [];
        res.forEach(({ category }) => {
          !categoriesToPush.includes(category)
            ? categoriesToPush.push(category)
            : null;
        });
        return categoriesToPush;
      };
      const newCategories = await getCategories();
      setCategories(newCategories);
    };
    get();
  }, []);

  const userDataArray = [
    { title: "Profile", to: "my-account" },
    { title: "Orders", to: "my-orders" },
  ];

    const toEmail = email == null ? "/" : "/home"

  return (
    <header className="fixed  z-10 top-0 w-full bg-white py-2">
      <nav className=" flex justify-between flex-row md:flex-row  ml-5 mr-5">
        <ul className="flex gap-4 ">
          <li>
            <NavItem activeStyle={activeStyle} to={toEmail} onClick={handleIsShow}>
              <span className="font-bold text-green-600">
                Shop
              </span>
              <span className="font-bold text-amber-950">
                pi!
              </span>
            </NavItem>
          </li>
          
          {categories
            ? categories.map((category, id) => {
                if (category == "men's clothing") {
                  return (
                    <li key={id}>
                      <NavItem
                        activeStyle={activeStyle}
                        isCategory={true}
                        to={`category/men-clothes`}
                        onClick={handleIsShow}
                      >
                        {category[0].toUpperCase() +
                          category.slice(1, category.length)}
                      </NavItem>
                    </li>
                  );
                }
                if (category == "women's clothing") {
                  return (
                    <li key={id}>
                      <NavItem
                        activeStyle={activeStyle}
                        isCategory={true}
                        to={`category/women-clothes`}
                        onClick={handleIsShow}
                      >
                        {category[0].toUpperCase() +
                          category.slice(1, category.length)}
                      </NavItem>
                    </li>
                  );
                }
                return (
                  <li key={id}>
                    <NavItem
                      activeStyle={activeStyle}
                      isCategory={true}
                      to={`category/${category}`}
                      onClick={handleIsShow}
                    >
                      {category[0].toUpperCase() +
                        category.slice(1, category.length)}
                    </NavItem>
                  </li>
                );
              })
            : ""}
        </ul>
        <button
          className={`${
            scaled ? "scale-150" : null
          }  h-6 w-6 mr-1 transition-transform z-10 md:hidden`}
          onClick={handleIsShow}
        >
          <ThreePoints />
        </button>
        <ul
          className={`flex gap-4 flex-col md:flex-row bg-white p-3  md:p-0 rounded-lg absolute md:static pointer-events-auto  md:z-10 z-[-1] top-[40px] right-0 ${
            isShow ? "flex " : "hidden md:flex"
          }`}
        >
          <li>
            <a className="font-light underline">{email}</a>
          </li>
          {userDataArray.map(({ title, to }, i) => {
            return (
              <li key={i}>
                <NavItem activeStyle={activeStyle} to={`/${to}`} onClick={handleIsShow}>
                  <span className="px-1">{title}</span>
                  {title == "Orders" ? (
                    <span className="text-red-600 font-bold">
                      {order.length}
                    </span>
                  ) : null}
                </NavItem>
              </li>
            );
          })}

          <li>
            <NavItem to={`/shopping-cart`} activeStyle={activeStyle} onClick={handleIsShow}>
              <div className="flex ">
                <ShoppingCartIcon
                  className={`${
                    scaled ? "scale-150" : null
                  } active:scale-150 h-6 w-6 mr-1 transition-transform`}
                />
                {count}
              </div>
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
}


const ThreePoints = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 pb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};

export default Navbar;