import { createContext } from 'react';

export const sampleOrder = {    
    orderDate    : "2023-02-01",
    orderNumber  : "TEMPID0132",
    customerName : "HAPPY SINGH",
    mobileNo     : "9988776655",
    station      : "NDLS",
    stationName  : "Delhi",
    restaurant   : "Shree Sai Bhojanle",
    train        : "12910",
    trainName    : "Garibrath",
    seatDetails  : "B1/20",
    coach        : "B1",
    seatno       : 20,
    deliveryDate : "2023-01-01",
    orderItems: [
        {
            item_id : "ITM0001",
            item_name : "Veg Thali - Delux",
            item_price : "250",
            item_quantity : "1"
        },
        {
            item_id : "ITM0020",
            item_name : "Chole Bhature",
            item_price : "120",
            item_quantity : "1"
        },
        {
            item_id : "ITM0201",
            item_name : "Masala Dosa",
            item_price : "90",
            item_quantity : "2"
        }
    ],
    totalPrice  : "550",
    discount    : "0",
    taxes       : "30",
    netprice    : "580",
    status      : "Payment Pending"
}

export const OrderContext = createContext(sampleOrder);