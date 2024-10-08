import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name:'products',
    initialState:{
        loading:false
    },
    reducers:{
        productsRequest(state,action){
            return {
                loading:true,

            }
        },

        productsSucess(state,action){
            return{
                loading:false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage : action.payload.resPerPage
            }
        },

        productsFail(state,action){
          return{  loading:false,
            error:action.payload
          }
        }

    }

});

const {actions, reducer} = productsSlice;

export const {productsRequest, productsSucess, productsFail} = actions;

export default reducer;