import { useLocation, useParams } from 'react-router-dom'
import '../component/productDetails.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsById } from '../redux/data/ProductData'
import { AppDispatch, RootState } from '../redux/store'

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
                            <img src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png" alt="green apple slice" />
                        </div>
                        {/* <div className="photo-album">
                            <ul>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png" alt="half apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png" alt="green apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png" alt="apple top" /></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
                <div className="product__info">
                    <div className="title">
                        <h1>Delicious Apples</h1>
                        <span>COD: 45999</span>
                    </div>
                    <div className="price">
                        R$ <span>7.93</span>
                    </div>
                    <div className="description">
                        <h3>BENEFITS</h3>
                        <ul>
                            <li>Apples are nutricious</li>
                            <li>Apples may be good for weight loss</li>
                            <li>Apples may be good for bone health</li>
                            <li>They're linked to a lowest risk of diabetes</li>
                        </ul>
                    </div>
                    <button className="buy--btn">ADD TO CART</button>
                </div>
            </section>
        </div>
    )
}

export default ProductDetails
