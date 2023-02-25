import { createContext } from 'react';

export const emptyCart = {    
    totalPrice  : "0",
    discount    : "0",
    taxes       : "0",
    netprice    : "0",
    status      : "initial",
    items       : []       
}

export const sampleCart = {    
    totalPrice  : "370",
    discount    : "0",
    taxes       : "30",
    netprice    : "400",
    status      : "paid",
    items: [
        {
            item_id : "FDSI001",
            item_name : "Veg Thali",
            item_price : "110",
            item_quantity : "2"
        },
        {
            item_id : "FDSI002",
            item_name : "Masala Dhosa",
            item_price : "80",
            item_quantity : "1"
        }

    ]
}

export const CartContext = createContext(emptyCart);