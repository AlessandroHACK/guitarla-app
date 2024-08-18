import { useMemo } from "react";
export default function Header({ cart, removeFromCart, increaseQuantity,decreaseQuantity, clearCart }) {
  //state derivado
  //useMemo memorisa el resultado de la funcion y va a recargar si hay un cambio en [cart]
  const isEmpty =useMemo( () => cart.length === 0, [cart])
  /**
   * reduc es un metodo de js que se utiliza para reducir el array a un solo valor, en este caso se usa para calcular un total(itera cada elemento del array)
   * creamos el esatdo con useMemo para calcular el total usando reduce en este caso total es el acomulador y item es el valor del array
   * gracias a useMmemo si hay un cambio en [cart] se ejecutara la funcion
   */
  const cartTotal =useMemo(() => cart.reduce((total, item)=>total +(item.quantity * item.price),0), [cart])
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      { /* Mapear cada guitarra en el estado cart y renderizar un componente Guitar */ }
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button type="button" className="btn btn-dark" onClick={()=> decreaseQuantity(guitar.id)}>
                                -
                              </button>
                              {guitar.quantity}
                              <button type="button" className="btn btn-dark" onClick={()=> increaseQuantity(guitar.id)}>
                                +
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" type="button" onClick={()=>removeFromCart(guitar.id)}>
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}

                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
