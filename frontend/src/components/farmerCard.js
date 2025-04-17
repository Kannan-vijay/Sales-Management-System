import { Link } from "react-router-dom"

export default function FarmerCard({farmer}){
    
    return <>   
                <Link to={"/billdetails/"+farmer._id} className="link">
                    <div class="farmer-card" data-name={farmer.name} data-date={farmer.date}>
                        <div class="farmer-info">
                            <div class="farmer-name">{farmer.name}</div>
                            <div class="farmer-details">
                            Date: {farmer.date} | Village: {farmer.place}<br/>
                            Total Bill: ₹{farmer.amount}
                            </div>
                        </div>
                        <div class={`bill-status ${farmer.isPaid ? 'paid' : 'not-paid'}`}>{(farmer.isPaid)?'Paid' : 'Not Paid'}</div>
                    </div>
                </Link>
            </>
}