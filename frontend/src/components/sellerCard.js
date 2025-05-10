import { Link } from "react-router-dom"

export default function SellerCard({seller}){
    
    return <>
                <Link to={"/sellerPaymentDetail/"+seller._id}>
                    <div className="seller-card">
                        <div className="seller-name">{seller?.name?.toUpperCase() || "Unknown Seller"}</div>
                        <div className="seller-place">{seller?.place?.toUpperCase() || "Unknown Place"}</div>
                    </div>
                </Link>
            </>
}