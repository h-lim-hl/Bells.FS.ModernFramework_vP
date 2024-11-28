import React, {useEffect} from 'react'
import HomePage from "./HomePage";
import ProductPage from "./ProductPage"
import RegisterPage from './RegisterPage';
import Navbar from './Navbar';
import Footer from "./Footer";
import ShoppingCart from './ShoppingCart';
import UserLogin from './Login';
import "./styles.css"
import { useFlashMessage } from './FlashMessageStore';

// use wouter to create routes in our React application
import { Route, Switch} from 'wouter';

export default function App() {

  const {clearMessage, getMessage} = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(()=>{
    if(flashMessage.message) {
    const timer = setTimeout(()=>{
      clearMessage();
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  }

  }, [flashMessage]);


return (
    <>

      <Navbar />
      { flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`}>
          {flashMessage.message}
        </div>
      )}

      {/* <Switch> defines the area in your React application
      that changes when the user goes to a different route */}
      <Switch>
        {/* One route is a URL path to a component */}
         <Route path="/" component={HomePage} />
         <Route path="/products" component={ProductPage} />
         <Route path="/register" component={RegisterPage} />
         <Route path="/cart" component={ShoppingCart} />
         <Route path="/login" component={UserLogin} />
      </Switch>
      <Footer/>
   

    </>
  )
}