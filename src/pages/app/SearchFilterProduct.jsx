import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useShopiContext } from "../../Context/context";
export const SearchInput = ({ itemsToFilter, setItemsToShow }) => {
  const { itemsToGet } = useShopiContext();
  const handleFilter = (e) => {
    const value = e.target.value;
    const itemsFilter = itemsToFilter.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setItemsToShow(itemsFilter);
  };

  const navigate = useNavigate();
  const handleHistory = (value) => {
    navigate("/category");
    if (value == "/men's clothing") {
      navigate(`/category/men-clothes`);
      return;
    }
    if (value == "/women's clothing") {
      navigate(`/category/women-clothes`);
      return;
    }
    navigate(`/category${value}`);
  };

  const itemsToOption = [];
  itemsToGet
    ? itemsToGet.forEach((item) => {
        itemsToOption.includes(item.category)
          ? null
          : itemsToOption.push(item.category);
      })
    : null;
  return (
    <article className="flex justify-center items-center flex-row my-10 ">
      <div className="border border-black rounded-lg overflow-hidden">
        <select
          type=""
          className="lg:hidden justify-self-center w-[200px] text-white bg-slate-500   px-2 py-1 text-center"
          onChange={(e) => handleHistory(e.target.value)}
        >
          <option value="" defaultValue={""}>
            Categories
          </option>
          {itemsToOption.map((item) => {
            return (
              <option
                className="capitalize"
                key={crypto.randomUUID()}
                value={`/${item}`}
              >
                {item}
              </option>
            );
          })}
        </select>
        <input
          onChange={(e) => handleFilter(e)}
          type="text"
          placeholder="Search products"
          className="flex flex- justify-self-center w-[200px] px-2 py-1 text-center"
        />
      </div>
    </article>
  );
};


SearchInput.propTypes = {
  itemsToFilter: propTypes.array,
  setItemsToShow: propTypes.func.isRequired,
};
