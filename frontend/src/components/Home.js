import { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector} from  'react-redux'
import { getProducts } from "../actions/productsActions";

export default function Home (){
//hook
 const dispatch = useDispatch();
 const {products, loading} = useSelector((state)=> state.productsState)

//hook
   useEffect(()=>{
     dispatch(getProducts)
   },[])




    return (
        <Fragment>
            <MetaData title={'Buy best Products'}/>
             <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
       
          {products && products.map(products =>(
             <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={products.images[0].image}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href="">{products.name}</a>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">{products.numOfReviews}</span>
              </div>
              <p className="card-text">{products.price}</p>
              <a href="#" id="view_btn" className="btn btn-block">View Details</a>
            </div>
                </div>
             </div>

           ))}
    
      </div>
    </section>
        </Fragment>
    )
}