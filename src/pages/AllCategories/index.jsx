import { useState } from "react";
import { useShopiContext } from "../../Context/context";
import { useEffect } from "react";
import ProductsLayout from "../../Products Layout/ProductsLayout";
import Card from "../../components/Card";
import { SearchInput } from "../app/SearchFilterProduct";
import { useParams } from "react-router-dom";

 function Categories() {
    const [items, setItems] = useState(null);
    const [itemsToShow, setItemsToShow] = useState(null);
    const { handleIsProductDetailOpen, handleProductToShow, addToList, itemsToGet } =
      useShopiContext();
    const {category} = useParams()
    useEffect(() => {
      if(itemsToGet == null) return
        if(category == "men-clothes"){
        setItems(itemsToGet.filter(item => item.category == "men's clothing"));
        setItemsToShow(itemsToGet.filter(item => item.category == "men's clothing"));

        return
        }
        if(category == "women-clothes"){
            setItems(itemsToGet.filter(item => item.category == "women's clothing"));
        setItemsToShow(itemsToGet.filter(item => item.category == "women's clothing"));

        return
            }
        setItems(itemsToGet.filter(item => item.category == category));
        setItemsToShow(itemsToGet.filter(item => item.category == category));
    }, [itemsToGet, category]);
  
    const showProductDetail = (object) => {
      handleIsProductDetailOpen();
      handleProductToShow(object);
    };
  return (
    <>
    <SearchInput itemsToFilter={items ? itemsToShow : null} setItemsToShow={setItems}/>
    <ProductsLayout>
        {items
        ? items.map((item) => {
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
    </ProductsLayout>
    </>
    )
}


export default Categories