import axios from "axios";
import {   } from "../slices/productsSlice";
import { productFail, productRequest, productSucess } from "../slices/ProductSlice";

// dispatch is a hook so we have to make only  in component

export const getProduct = id => async(dispatch)=>{
   try {
      dispatch(productRequest())
      const {data}= await axios.get(`http://localhost:8000/api/v1/product/${id}`);
      dispatch(productSucess(data));

   } catch (error) {
      //handle Error
       dispatch(productFail(error.response.data.message))
   }
   
}