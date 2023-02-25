import './App.css';
import Header from './Components/Header/Header.js';
import SideMenu from './Components/SideMenu/SideMenu.js';
import RightPane from './Components/RightPane/RightPane.js';
import Footer from './Components/Footer/Footer.js';
import NoPage from './Components/NoPage/NoPage.js';
import UnderConstruction from './Components/NoPage/UnderConstruction.js';
import Login from './Components/Login/Login.js';
import Registration from './Components/Login/Registration.js';
import Blank from './Components/RightPane/Blank.js';
import ResetPassword from './Components/Login/ResetPassword.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import OrderHistoryCust from './Components/OrderHistory/OrderHistoryCust.js';
import AllOrders from './Components/OrderHistory/OrderHistoryRest.js';
import FAQ from './Components/FAQ/FAQ.js';
import OrderFood from './Components/OrderFood/OrderFood.js';
import OrderFoodTrain from './Components/OrderFood/OrderFoodTrain.js';
import OrderFoodStation from './Components/OrderFood/OrderFoodStation.js';
import OrderFoodRest from './Components/OrderFood/OrderFoodRest.js';
import OrderFoodMenu from './Components/OrderFood/OrderFoodMenu.js';
import RestDetails from './Components/RestDetails/RestDetails.js';
import RestMenu from './Components/RestMenu/RestMenu.js';
import AddMenuItem from './Components/RestMenu/AddMenuItem.js';
import Profile from './Components/Profile/Profile.js';
import DisplayCart from './Components/Cart/DisplayCart.js';
import DisplaySideCart from './Components/Cart/DisplaySideCart.js';
import OrderConfirmation from './Components/OrderFood/OrderConfirmation.js';
import Payment from './Components/Payment/Payment';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { UserContext, defaultUser } from './Contexts/UserContext';
import { AlertContext, defaultMessage } from './Contexts/AlertContext';
import { CartContext, emptyCart, sampleCart } from './Contexts/CartContext';
import { OrderContext, sampleOrder } from './Contexts/OrderContext';
import { useState} from "react";

export default function App() {  

  //Obtain and set various contexts, in next step these are passed to context providers
  const [user, setUser] = useState(defaultUser);
  const [cart, setCart] = useState(sampleCart);
  const [order, setOrder] = useState(sampleOrder);
  const [alert, setAlert] = useState(defaultMessage);

  return ( 
    //Context providers
    <UserContext.Provider value={[user, setUser]}> 
    <AlertContext.Provider value={[alert, setAlert]}> 
    <CartContext.Provider value={[cart, setCart]}> 
    <OrderContext.Provider value={[order, setOrder]}> 
      <Router>
          <div className="container"> 
            <div className="row">
              <Header />
            </div>
            
            <div className="row">
              <SideMenu />
              
              <div className="column central-pane" id="BMM">              
                <Routes>
                    <Route exact path="/" element={<OrderFood />}/>                  
                    <Route exact path="/index" element={<OrderFood />}/>                  					
                    <Route exact path="/home"  element={<OrderFood />}/>
					
					          <Route exact path="/dashboard" element={<Dashboard />}/>
					
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Registration />}/>
                    <Route exact path="/forgot-password" element={<ResetPassword />}/>
					
					          <Route exact path="/order-food" element={<OrderFood />}/>
                    <Route exact path="/order-food/cart" element={<DisplayCart />}/>
                    <Route exact path="/order-food/train/:train_no" element={<OrderFoodTrain/>}/>
                    <Route exact path="/order-food/station/:station_code" element={<OrderFoodStation/>}/>
                    <Route exact path="/order-food/rest/:station_code/:train_no" element={<OrderFoodRest/>}/> 
                    <Route exact path="/order-food/restaurant/:rest_id" element={<OrderFoodMenu/>}/>
                    <Route exact path="/order-food/restaurant/:rest_id/:menu_id" element={<OrderFoodMenu/>}/>
                    <Route exact path="/order-conf-page" element={<OrderConfirmation />} />
                    <Route exact path="/payment" element={<Payment />}/>    
					
					          <Route exact path="/order-history/cust" element={<OrderHistoryCust />}/>
                    <Route exact path="/order-history/rest" element={<AllOrders />}/>
					                    
					          <Route exact path="/rest-menu" element={<RestMenu />}/>
                    <Route exact path="/rest-settings" element={<RestDetails />}/>
					          <Route exact path="/profile" element={<Profile />}/>                    
                    
					          <Route exact path="/faq" element={<FAQ />}/>     
                    <Route exact path="/journey" element={<UnderConstruction />}/>  
					          <Route exact path="*" element={<NoPage />}/>
                </Routes>
              </div>

              <div className="column right-pane" id="BMR">
                <Routes>
                    <Route exact path="/" element={<RightPane />}/>
                    <Route exact path="/home" element={<RightPane />}/>
                    <Route exact path="/dashboard" element={<Blank message=""/>}/>
					
					          <Route exact path="/login" element={<Blank message="Enter user id and password to login. Password min 8 chars and UIDxxx (where xxx = 001, 002, 003 or 004)."/>}/>
                    <Route exact path="/register" element={<Blank message="Enter user details to register. You can register a user to both the roles - Customer and Restuarant."/>}/>
					          <Route exact path="/forgot-password" element={<Blank message="Reset password using OTP authentication. Password should be atleast 8 character."/>}/>
                    
					          <Route exact path="/order-food" element={<Blank message=""/>}/>
                    <Route exact path="/order-food/cart" element={<Blank message=""/>}/>
                    <Route exact path="/order-food/train/:train_no" element={<Blank message=""/>}/>
                    <Route exact path="/order-food/station/:station_code" element={<Blank message=""/>}/>
                    <Route exact path="/order-food/rest/:station_code/:train_no" element={<Blank message=""/>}/>
                    <Route exact path="/order-food/restaurant/:rest_id" element={<DisplaySideCart />}/>
                    <Route exact path="/order-food/restaurant/:rest_id/:menu_id" element={<DisplaySideCart />}/>
                    <Route exact path="/order-conf-page" element={<Blank message="Check details and make payment."/>} />
                    <Route exact path="/payment" element={<Blank message="Choose payment option and provide payment details."/>} />

                    <Route exact path="/order-history/cust" element={<Blank message=""/>}/>
                    <Route exact path="/order-history/rest" element={<Blank message="All orders till date."/>}/>
					
                    <Route exact path="/rest-menu" element={<AddMenuItem/>}/>
                    <Route exact path="/rest-settings" element={<Blank message=""/>}/>
                    <Route exact path="/profile" element={<Blank message=""/>}/>
					
					          <Route exact path="/faq" element={<Blank message="This page is placeholder."/>}/>  
                    <Route exact path="/journey" element={<Blank message="This page is placeholder."/>}/> 
                    <Route exact path="*" element={<Blank message=""/>}/>
                </Routes>
              </div>
              
            </div>     
            
            <div className="row">
              <Footer />
            </div> 

          </div>
      </Router>

    </OrderContext.Provider>
    </CartContext.Provider>
    </AlertContext.Provider>
    </UserContext.Provider>
  );
}

