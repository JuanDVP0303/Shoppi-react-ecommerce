import { useState } from "react";
import { useShopiContext } from "../../Context/context";
import { SearchInput } from "../app/SearchFilterProduct";
import Card from "../../components/Card";
import ProductDetail from "../../Product detail";
import { useEffect } from "react";

function Home() {
  const {
    handleIsProductDetailOpen,
    handleProductToShow,
    addToList,
    itemsToGet,


  } = useShopiContext();
  const [itemsToShow, setItemsToShow] = useState(null);

  useEffect(() => {
    if (itemsToGet == null) return;
    setItemsToShow(itemsToGet);
  }, [itemsToGet]);

  const showProductDetail = (object) => {
    handleIsProductDetailOpen();
    handleProductToShow(object);
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <SearchInput
        itemsToFilter={itemsToGet ? itemsToGet : null}
        setItemsToShow={setItemsToShow}
      />
      <div className="flex flex-row flex-wrap justify-center gap-10 pt-5 w-[90%] m-m-0-auto">
        <ProductDetail />
        {itemsToShow
          ? itemsToShow.map((item) => {
              const { id, title, price, category, image } = item;
              return (
                <Card
                  functionToClick={[
                    () => showProductDetail(item),
                    (e) => addToList(e, item),
                  ]}
                  key={id}
                  name={title}
                  price={price}
                  category={category}
                  image={image}
                  id={id}
                />
              );
            })
          : "Loading..."}
        {itemsToShow && itemsToShow.length == 0 ? (
          <div className="flex justify-center">
            <h2 className="font-light">
              Your search do not match with none product
            </h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
