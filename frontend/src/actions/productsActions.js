import axios from "axios";
import { productsRequest, productsFail, productsSucess,  } from "../slices/productsSlice";

// dispatch is a hook so we have to make only  in component

export const getProducts = async(dispatch)=>{
   try {
      dispatch(productsRequest())
      const {data}= await axios.get('http://localhost:8000/api/v1/products');
      dispatch(productsSucess(data));

   } catch (error) {
      //handle Error
       dispatch(productsFail(error.response.data.message))
   }
   
}

