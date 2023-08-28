import ProductDetail from "../Product detail";

export default function ProductsLayout({children}) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 pt-5 w-[90%] m-m-0-auto">
      <ProductDetail />
        {children}
    </div>
  );
}
