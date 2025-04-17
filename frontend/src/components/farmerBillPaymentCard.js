import { useState } from "react";
import { Link } from "react-router-dom"

export default function FarmerBillPayementCard({farmer}){
    const [notification, setNotification] = useState('');
    const [isActive, setIsActive] = useState(farmer.isPaid);
    function billPayment(){
        fetch(`${process.env.REACT_APP_API_URI}/farmers/pay/${farmer._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to update');
            return res.json();
        })
        .then(data => {
            setNotification(data.message);
            setIsActive(true);
            setTimeout(() => setNotification(''), 3000);
        })
        .catch(err => {
            setNotification("Failed to update.");
            setTimeout(() => setNotification(''), 3000);
        });
    }
    
    return <>   
                    {notification && (
                        <div className="top-notification">
                            {notification}
                        </div>
                    )}
                    <div class="farmer-card" data-name="Sundar Raj" data-date="2025-04-03">
                        <div class="farmer-info">
                        <div class="farmer-name">
                            <Link to={"/billdetails/"+farmer._id} className="link">
                            {farmer.name}
                            </Link>
                        </div>
                        <div class="farmer-details">
                            Date: {farmer.date} | Village: {farmer.place}<br/>
                            Total Bill: ₹{farmer.amount}
                        </div>
                        </div>
                        <button onClick={billPayment} class={`bill-status ${isActive ? 'paid' : 'not-paid-btn'}`}>
                            {(isActive)?'Paid' : 'Not Paid' }
                        </button>
                        
                    </div>
            </>
}