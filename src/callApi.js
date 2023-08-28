export async function getProducts(){
    const res = await fetch("https://fakestoreapi.com/products", {
        method: "GET",   
        headers: {
            "Content-Type": "application/json",
            "Cache-Control":  "max-age=86400",
            "Access-Control-Allow-Origin": "*"
          },
    })
    const data = await res.json()
    return data
    

}