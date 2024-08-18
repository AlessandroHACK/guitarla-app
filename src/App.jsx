import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./Data/db";

function App() {
  const initialCart =()=>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  // Estado para almacenar los datos de las guitarras y el carrito
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MIN_ITEM = 1
  const MAX_ITEM = 5

  //useEffect ayuda a en los efectos secunadorios cuando es esatdo cambia
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Función para añadir un artículo al carrito
  function addToCart(item) {
    // Comprobar si el artículo ya está en el carrito
    // findIndex() devuelve el índice de ese artículo. Si el artículo no está presente, devuelve -1
    //nota: guitar.id solo es el nombre de una variable para repecentar cada elemento del estado
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);
    if (itemExists >= 0) {
      // Si el artículo ya está en el carrito, actualizar la cantidad
      if(cart[itemExists].quantity >= MAX_ITEM) return
      const updateCart = [...cart]; //creamos una copia 
      updateCart[itemExists].quantity++; //en la copia en la posicion data por itemExists se aumneta la cantidad
      setCart(updateCart); //se acyualiza el estado
    } else {
      // Si el artículo no está en el carrito, añadirlo con una cantidad de 1
      item.quantity = 1;
      //se crea una copia del carrito y se añade el producto al final de la copia(item)
      setCart([...cart, item]);
    }
  
  }

  // Función para eliminar un artículo del carrito
  function removeFromCart(id) {
    // Filtrar el carrito para excluir el artículo con el ID dado
    //prevCart es el estado anterior del cart
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function increaseQuantity(id){
  const updateCart = cart.map(item=>{
    if(item.id === id && item.quantity<MAX_ITEM){
      return{
        ...item,
        quantity:item.quantity +1 
      }  
    }
    return item
  })
  setCart(updateCart)
    
  }
  function decreaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart(){
    setCart([])
  }
 
  

  return (
    <div>
      {/* Componente Header que muestra el carrito y permite eliminar artículos */}
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart = {clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Mapear cada guitarra en la base de datos y renderizar un componente Guitar */}
          {data.map((guitar) => {
            return (
              <Guitar 
                key={guitar.id}
                guitar={guitar} // Pasar la guitarra como propiedad al componente Guitar
                addToCart={addToCart} // Pasar la función addToCart al componente Guitar
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
