import { useState } from "react";
import { Link } from "react-router-dom";

export default function SellerCreditCard({ seller }) {
    const [inputAmount, setInputAmount] = useState('');
    const [notification, setNotification] = useState('');
    const [paidAmount, setPaidAmount] = useState(seller.paidAmount);
    const [date,setDate] = useState("");

    const credit = seller.totalAmount - paidAmount;

    function handleChange(e) {
        setInputAmount(parseInt(e.target.value));
    }

    function updateAmount() {
        if (!inputAmount || isNaN(inputAmount)) {
            setNotification("Please enter a valid amount.");
            setTimeout(() => setNotification(''), 3000);
            return;
        }

        fetch(`${process.env.REACT_APP_API_URI}/sellers/pay/${seller._id}`, {
            method: "PUT",
            body: JSON.stringify({ 
                detail : "Payment Received",
                date : date,
                amount: inputAmount }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to update');
            return res.json();
        })
        .then(data => {
            setNotification("Amount updated successfully!");
            setPaidAmount(data.paidAmount);
            setInputAmount('');
            setTimeout(() => setNotification(''), 3000);
        })
        .catch(err => {
            setNotification("Failed to update.");
            setTimeout(() => setNotification(''), 3000);
        });
    }
    function updateDate(e){
        const temp=e.target.value;
        const [year, month, day] = temp.split("-");
        const reversedDate = `${day}-${month}-${year}`;
        setDate(reversedDate);
    }
    return (
        <>
        {notification && (
            <div className="top-notification">
                {notification}
            </div>
        )}
        <div className="seller-card">
            <div>
                <Link to={`/sellerPaymentDetail/${seller._id}`} className='link'>
                    {seller.name.toUpperCase()}
                </Link>
            </div>
            <div>
                <Link to={`/sellerPaymentDetail/${seller._id}`} className='link'>
                    {seller.place}
                </Link>
            </div>
            <div className="credit-display">
                Current Credit: ₹{credit}
            </div>
            <div className="credit-section">
                <input
                    type="number"
                    placeholder="Enter amount paid"
                    value={inputAmount}
                    onChange={handleChange}
                />
                <input type="date" onChange={updateDate}/>
                <button onClick={updateAmount}>Update</button>
            </div>
        </div>
        </>
    );
}
