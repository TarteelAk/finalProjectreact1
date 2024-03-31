import React, { createContext, useState } from 'react'
export const ShopContext = createContext(null);


export const ShopContextProvider = (props) =>{
    const [cart , setCart] = useState();
    return <ShopContext.Provider>{props.children}</ShopContext.Provider>
}
