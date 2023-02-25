import { createContext } from 'react';

export const defaultMessage = {
    alertMessage: "",
    alertType: "default",
}

export const AlertContext = createContext(defaultMessage);
