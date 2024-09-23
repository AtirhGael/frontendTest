import { useLocation, useParams } from 'react-router-dom'
import '../component/productDetails.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsById } from '../redux/data/ProductData'
import { AppDispatch, RootState } from '../redux/store'
import yamImage from './../assets/image.png';

function ProductDetails() {
    const productId = useLocation()
    const params = productId.state
  const dispatch: AppDispatch = useDispatch();

    const { products, loading, error } = useSelector((state: RootState) => state.products);
    useEffect(() => {
        dispatch(fetchProductsById(params))
    }, [dispatch])



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className='product-details-container'>
            <section className="product">
                <div className="product__photo">
                    <div className="photo-container">
                        <div className="photo-main">
                            <div className="controls">
                                <i className="material-icons">share</i>
                                <i className="material-icons">favorite_border</i>
                            </div>
                            <img src={yamImage} alt="product image" />
                        </div>
                       
                    </div>
                </div>
                <div className="product__info">
                    <div className="title">
                        <h1>Product Title here</h1>
                   
                    </div>
                    <div className="price">
                        $ <span>5055151</span>
                    </div>
                    <div className="description">
                        <h3>Description</h3>
                        <p>
                            product description here
                        </p>
                    </div>
                    <button className="buy--btn">buy</button>
                </div>
            </section>
        </div>
    )
}

export default ProductDetails
