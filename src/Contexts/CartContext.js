import { createContext } from 'react';

export const emptyCart = {    
    totalPrice  : "0",
    discount    : "0",
    taxes       : "0",
    netprice    : "0",
    status      : "initial",
    items       : [{}]       
}

export const sampleCart = {    
    totalPrice  : "110",
    discount    : "0",
    taxes       : "10",
    netprice    : "120",
    status      : "initial",
    items: [
        {
            item_id : "FDSI001",
            item_name : "Veg Thali",
            item_price : "110",
            item_quantity : "1"
        }

    ]
}

export const CartContext = createContext(emptyCart);