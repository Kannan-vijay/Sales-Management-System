import { Link } from "react-router-dom"

export default function SellerCard({seller}){
    
    return <>
                <Link to={"/sellerPaymentDetail/"+seller._id}>
                    <div class="seller-card">
                    <div class="seller-name">{seller.name.toUpperCase()}</div>
                    <div class="seller-place">{seller.place.toUpperCase()}</div>
                    </div>
                </Link>
            </>
}