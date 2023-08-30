import { NavLink } from "react-router-dom";
import { useShopiContext } from "../Context/context";
import { getProducts } from "../callApi";
import { useEffect } from "react";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import propTypes from "prop-types";


const NavItem = ({ activeStyle, to, children, isCategory, onClick }) => {
  const mobileView = isCategory ? "hidden lg:block" : null;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `${isCategory ? mobileView : ""} ${
          isActive ? `${activeStyle}` : ""
        }`;
      }}
      onClick={onClick}
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
  onClick: propTypes.func,
};

function Navbar() {
  const { order } = useShopiContext();
  const { count, scaled, resetData, actualUser } =
    useShopiContext();
  const [categories, setCategories] = useState(null);
  const [isShowDisplayMenu, setIsShowDisplayMenu] = useState(false);
  const activeStyle = "underline font-bold underline-offset-4";
  const handleIsShowDisplayMenu = (showOrNot) => {
    if (showOrNot == false) {
      setIsShowDisplayMenu(false);
      return;
    }
    setIsShowDisplayMenu(!isShowDisplayMenu);
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

  let userDataArray = [
    { title: "Profile", to: "my-account" },
    { title: "Orders", to: "my-orders" },
  ];

  //Si actualUser.email no existe entonces no renderizamos profile
  if (actualUser?.email == undefined) {
    userDataArray = userDataArray.slice(1);
  }

  return (
    <header className="fixed  z-10 top-0 pt-3 w-full bg-white py-2">
      <nav className=" flex justify-between flex-row md:flex-row  ml-5 mr-5">
        <ul className="flex gap-4">
          <li>
            <NavItem
              activeStyle={activeStyle}
              to={"/"}
              onClick={handleIsShowDisplayMenu}
            >
              <span className="font-bold text-green-600">Shop</span>
              <span className="font-bold text-amber-950">pi!</span>
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
                        onClick={handleIsShowDisplayMenu}
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
                        onClick={handleIsShowDisplayMenu}
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
                      onClick={handleIsShowDisplayMenu}
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
          onClick={handleIsShowDisplayMenu}
        >
          <ThreePoints />
        </button>
        <ul
          className={`flex gap-4 flex-col md:flex-row bg-white p-3  md:p-0 rounded-lg absolute md:static pointer-events-auto  md:z-10 z-[-1] top-[40px] right-0 ${
            isShowDisplayMenu ? "flex " : "hidden md:flex"
          }`}
        >
          <li>
            <a className="font-light underline">{actualUser ? actualUser.email : null}</a>
          </li>
          {actualUser ? (
            <li>
              <NavItem to={`/sign-in`} onClick={resetData}>
                Sign out
              </NavItem>
            </li>
          ) : (
            <li>
              <NavItem activeStyle={activeStyle} to={`/sign-in`}>
                Sign in
              </NavItem>
            </li>
          )}

          {userDataArray.map(({ title, to }, i) => {
            return (
              <li key={i}>
                <NavItem
                  activeStyle={actualUser ? activeStyle : null}
                  to={actualUser ?  `/${to}` : "/sign-in" }
                  onClick={() => {
                    handleIsShowDisplayMenu(false);
                  }}
                >
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
            <NavItem
              to={actualUser?.email ? `/shopping-cart` : "/sign-in"}
              activeStyle={actualUser ? activeStyle : null}
              onClick={() => handleIsShowDisplayMenu(false)}
            >
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
