import './App.css';
import Simple from './Simple';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Products from './components/Products/Products';
// import NavbarFile from './components/Navbar/NavbarFile';

import { Products, NavbarFile, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'
import { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    console.log("handle add..........................")
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  }

  const handleUpdateQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
  }

  const handleRemoveItem = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response);
  }

  const handleEmptyCart = async () => {
    const resposne = await commerce.cart.empty();
    setCart(resposne);
  }

  const refreshCart = async () => {
    const newCart =  await commerce.cart.refresh();
    setCart(newCart); 
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
    } catch (error) {
      setError(error.data.error.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(cart);

  return (
    <Router>

      <div className="App">
        <NavbarFile totalItems={cart.total_items} />
        <Routes>
          {/* <Route exact path="/" element={< Products arts={products} onAddToCart={handleAddToCart} />}</Route>  */}
          <Route exact path='/' element={< Products arts={products} onAddToCart={handleAddToCart} />}></Route>
          <Route exact path="/cart" element={
            <Cart
              handleUpdateQty={handleUpdateQty}
              handleRemoveItem={handleRemoveItem}
              handleEmptyCart={handleEmptyCart}
              cart={cart} />}>
          </Route>
          <Route exact path='/checkout' element={
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} errorMsg={error}/>
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
