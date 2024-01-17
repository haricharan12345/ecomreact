const cartReducer = (state,action) => {
    if(action.type==="ADD_TO_CART"){

        let{id,color,amount,product}=action.payload;

        //to find the existing product in the cart=>
        //if suppose the the same product with same color added twise for diffrent timimgs

        let existingProduct = state.cart.find((curItem) => {
            //the curItem.id is the unique id which is id+color 
           return  curItem.id===id + color;

        });
        // console.log(existingProduct);

        if(existingProduct){
            let updatedProduct=state.cart.map((curElem)=>{
                if(curElem.id===id+color){
                    let newAmount=curElem.amount+amount;
                //the amount(stock) of  added item  should not be
                //greter than the stock(instock)
                //here max is the instock item number
                    if(newAmount>=curElem.max){
                        newAmount=curElem.max;
                    }

                    return {
                        ...curElem,amount:newAmount
                    }
                }
                else{
                    return curElem;
                    }
               });
               return{...state,
                    cart:updatedProduct,
            }

        }
        else{
        let cartProduct;
        cartProduct={
            //to create unique id cause each colored same product is considered 
            // as diffrent product
            //id is the combination of the id and product
            id:id+color,
            name:product.name,
            //key and value is same
            color,
            amount,
            image:product.image[0].url,
            price:product.price,
            //amount more than stock can not be added
            max:product.stock
        }
        return{...state,
            //this will add the to the exising cart
            cart:[...state.cart,cartProduct],
        }
    }

    }
    if(action.type==="REMOVE_ITEM"){
        //this functions displays all the item
        //except the item clicked (remove button)
        //here action.payload contains the id
        let updatedCart=state.cart.filter(
            (curItem)=>curItem.id!==action.payload
        )
        return{
            ...state,
            cart:updatedCart,

        }
    }
  // to set incre and decre
    if(action.type==="SET_DECREMENT"){
        let updatedProduct=state.cart.map((curElem)=>{
            if(curElem.id===action.payload)
            {
                // console.log(curElem);
                let decAmount =curElem.amount-1;

                if(decAmount<=1){
                   decAmount=1;
                }
                return {
                    ...curElem,
                    amount:decAmount
                }
            }
            else{
                return curElem;
            }
        })

        return{
            ...state,
            cart:updatedProduct

        }

    }


    if(action.type==="SET_INCREMENT"){
        let updatedProduct=state.cart.map((curElem)=>{
            if(curElem.id===action.payload)
            {
                // console.log(curElem);
                let IncAmount =curElem.amount+1;

                if(IncAmount>=curElem.max){
                    IncAmount=curElem.max;
                }
                return {
                    ...curElem,
                    amount:IncAmount
                }
            }
            else{
                return curElem;
            }
        })

        return{
            ...state,
            cart:updatedProduct

        }

    }
    //to clear the cart
    if(action.type==="CLEAR_CART")
    {
        return{
            ...state,
            cart:[],
        }
    }

// if(action.type==="CART_TOTAL_ITEM"){
//     let updatedItemVal=state.cart.reduce((initialVal,curElem)=>{
//        let {amount}=curElem;
//        initialVal=initialVal+amount;
//        return initialVal;
//     },0);

//     return{
//         ...state,
//         total_item:updatedItemVal
//     };
  

// }

// if(action.type==="CART_TOTAL_PRICE"){
//     let total_price=state.cart.reduce((initialVal,curElem)=>{
//         let {price,amount}=curElem
//         initialVal=initialVal+(price*amount)
//         return initialVal;

//     },0)

//     return{
//         ...state,
//         //key and value is same
//         total_price
//     };
// }

if(action.type==="CART_ITEM_PRICE_TOTAL"){
    let {total_item,total_price}=state.cart.reduce((accum,curElem)=>
    {
        let {amount,price}=curElem;
        accum.total_item+=amount;
        accum.total_price+=(price*amount)
        return accum;
 

    },{total_item:0,total_price:0})

    return{
        ...state,
        total_item,
        total_price
    };

}

    

  return state;
}

export default cartReducer
