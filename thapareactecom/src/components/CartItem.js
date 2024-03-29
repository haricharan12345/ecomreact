import React from 'react'
import FormatPrice from '../Helpers/FormatPrice';
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from '../context/cart_context';

//here directly dedtrecturing the object from  {...curElem} of <Cart/>
// {...curElem} contains {id,name,image,color,price,amount} all these properties
const CartItem = ({id,name,image,color,price,amount}) => {

    const { removeItem,setDecrement,setIncrement } = useCartContext();

    return (
      <div className="cart_heading grid grid-five-column">
        <div className="cart-image--name">
          <div>
            <figure>
              <img src={image} alt={id} />
            </figure>
          </div>
          <div>
            <p>{name}</p>
            <div className="color-div">
              <p>color:</p>
              <div
                className="color-style"
                style={{ backgroundColor: color, color: color }}></div>
            </div>
          </div>
        </div>
        {/* price   */}
        <div className="cart-hide">
          <p>
            <FormatPrice price={price} />
          </p>
        </div>
  
        {/* Quantity  */}
        <CartAmountToggle
          amount={amount}
          setDecrease={()=>setDecrement(id)}
          setIncrease={()=>setIncrement(id)}
        />
  
        {/* //Subtotal */}
        <div className="cart-hide">
          <p>
            <FormatPrice price={price * amount} />
          </p>
        </div>
  
        <div>
          <FaTrash 
          className="remove_icon"
           onClick={() => removeItem(id)} />
        </div>
      </div>
    );
  };

export default CartItem
