import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import Message from "./Message";
import Loader from "./Loader";
import { featureProducts } from "../actions/productActions";



const ProductCarousel = () => {

    const dispatch = useDispatch();

    const productFeature = useSelector(state => state.productFeature);
    const {loading, error, products} = productFeature;

    useEffect(() => {
        dispatch(featureProducts())

    },[dispatch])


    return ( 
        loading ? <Loader/>
        : error 
        ? <Message variant='danger'>{error}</Message>
        : (
            <Carousel pause='hover' className='bg-primary'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>

                            <Image src={product.image} alt={product.name} fluid />

                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (₹{product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel;