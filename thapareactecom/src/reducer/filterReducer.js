const filterReducer=(state,action)=>{

    switch(action.type){
        // filter_products:[...action.payload],
        // all_products:[...action.payload],
        // these will not alter the existing data

    
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price);
            //  console.log(priceArr);
            // why we are using spread operator here=>
            //The function finds the maximum value among these individual arguments and returns it. 
            //In this example,
            //it would be equivalent to calling Math.max(10, 20, 30, 15, 25).

            let maxPrice = Math.max(...priceArr);

            // console.log(maxPrice);
            return{
                ...state,
                filter_products:[...action.payload],
                all_products:[...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice },

            }

        case "SET_GRID_VIEW":
            return{
                ...state,
                grid_view:true,
            }
        case "SET_LIST_VIEW":
                return{
                    ...state,
                    grid_view:false,
                }

            case "GET_SORT_VALUE":
                //getting the value from the select of <Sort/> component
                // this is previous code 
                // let userSortValue=document.getElementById("sort");
                //getting the value from options user that is clicked
                // let sort_value=userSortValue.options[userSortValue.selectedIndex].value
                // console.log(sort_value);
                //we are getting the value directly from using event.target.value
                

                return{
                    ...state,
                    //this payload contains the  selected from Select options
                    sorting_value:action.payload
                }

                case "SORTING_PRODUCTS":
                    let newSortData;
                    const{filter_products,sorting_value}=state;
                    //it will create the copy 
                    let tempSortProduct=[...filter_products];
                    //here name is name="sort" from the select of <Sort/>
                    // this is function that is actually sorting the datas

                    const sortingProducts=(a,b)=>{

                       if(sorting_value==="lowest"){                    
                           return a.price-b.price;
                         }

                        if(sorting_value==="highest"){
                            return b.price-a.price;
                         }
                             //comparing the string
                        if(sorting_value==="a-z"){
                               return a.name.localeCompare(b.name)
                         }
                         if(sorting_value==="z-a"){
                                return b.name.localeCompare(a.name)
                             }
                              }

                        //here tempSortProduct is copy of data(products)
                        //sort function will just select and set the value as clicked 
                        //sortingProducts is actual function that will sort based on diffrent categories
                        newSortData=tempSortProduct.sort(sortingProducts);
                    return{
                         ...state,
                        // here its filter_products  contains the sorted data
                         filter_products:newSortData

                         }

                    case "UPDATE_FILTERS_VALUE":
                        const{name,value}=action.payload;

                        return{
                            ...state,
                            filters:{
                                ...state.filters,
                                //whatever value  entered by the user
                                [name]:value,
                            }
                        }

                    case "FILTER_PRODUCT":
                        let {all_products}=state;
                        let tempFilterProduct=[...all_products];

                        const{text,category,company,color,price}=state.filters;

                        if(text){
                            tempFilterProduct=tempFilterProduct.filter((curElem)=>
                                //the "name" is a feild of the api object
                                 curElem.name.toLowerCase().includes(text)
                            
                        )
                        }
                        
       if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
        );
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }

      if(price===0){
        tempFilterProduct=tempFilterProduct.filter((curElem)=>
          curElem.price===price
        )
      }
      else{
        tempFilterProduct=tempFilterProduct.filter((curElem)=>
        curElem.price<=price
        )


      }

      
                         
                        return{
                            ...state,
                            filter_products:tempFilterProduct,
                        }


                        case "CLEAR_FILTERS":
                            return {
                              ...state,
                              filters: {
                                ...state.filters, 
                                text: "",
                                category: "all",
                                company: "all",
                                color: "all",
                                maxPrice: state.filters.maxPrice,
                                price: state.filters.maxPrice,
                                minPrice: state.filters.minPrice,
                              },
                            };

                  
                       

                   default :
                  return state;
           
    }


}
export default  filterReducer