"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";


type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
};



type CartContextType = {

  cart: Product[];

  addToCart:(product:Product)=>void;

  updateQuantity:(id:number|string, quantity:number)=>void;

  removeFromCart:(id:number|string)=>void;

  clearCart:()=>void;

};



const CartContext = createContext<CartContextType | undefined>(undefined);





export function CartProvider({
  children
}:{
  children:ReactNode
}){


  const [cart,setCart] = useState<Product[]>([]);



  // Load cart
  useEffect(()=>{

    const savedCart = localStorage.getItem("cart");

    if(savedCart){

      setCart(JSON.parse(savedCart));

    }

  },[]);





  // Save cart
  useEffect(()=>{

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  },[cart]);







  const addToCart = (product:Product)=>{


    setCart((oldCart)=>{


      const exists = oldCart.find(
        item=>item.id === product.id
      );



      if(exists){


        return oldCart.map(item=>

          item.id === product.id

          ?

          {
            ...item,
            quantity:item.quantity + 1
          }

          :

          item

        );

      }



      return [

        ...oldCart,

        {
          ...product,
          quantity:1
        }

      ];

    });


  };






  const updateQuantity = (
    id:number|string,
    quantity:number
  )=>{


    setCart(oldCart=>

      oldCart.map(item=>

        item.id === id

        ?

        {
          ...item,
          quantity: quantity < 1 ? 1 : quantity
        }

        :

        item

      )

    );


  };






  const removeFromCart = (
    id:number|string
  )=>{


    setCart(oldCart=>

      oldCart.filter(
        item=>item.id !== id
      )

    );


  };






  const clearCart = ()=>{

    setCart([]);

    localStorage.removeItem("cart");

  };






  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        updateQuantity,

        removeFromCart,

        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );


}







export function useCart(){

  const context = useContext(CartContext);


  if(!context){

    throw new Error(
      "useCart must be inside CartProvider"
    );

  }


  return context;

}