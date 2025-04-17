import React, { Fragment, useState } from "react";

function SellerBilling() {
  const [rows, setRows] = useState([{ price: "", quantity: "" }]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [regularCustomer, setRegularCustomer] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [name,setName] = useState("");
  const [place,setPlace] = useState("");
  const [date,setDate] = useState("");
  const [amount,setAmount] = useState(0);
  const [finalamount,setFinalamount] = useState(0);
  const [notification, setNotification] = useState('');
  const addRow = () => {
    setRows([...rows, { price: "", quantity: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  function updateDate(e){
    const temp=e.target.value;
    const [year, month, day] = temp.split("-");
    const reversedDate = `${day}-${month}-${year}`;
    setDate(reversedDate);
  }

  const generateBill = () => {
    if (!name || !place || !date || totalQuantity === 0) {
        alert("Please fill in all required fields before generating the bill.");
        return;
      }
    let totalAmount = 0;
    let labourWages = 5 * totalQuantity;

    const calculatedRows = rows.map(({ price, quantity }) => {
      const priceNum = parseFloat(price) || 0;
      const quantityNum = parseFloat(quantity) || 0;
      const total = priceNum * quantityNum;
      totalAmount += total;
      return { price: priceNum, quantity: quantityNum, total };
    });
    const discount = (regularCustomer)? (totalAmount/100)*2 : 0;
    const remaining = totalAmount + (labourWages - discount);
    

    setBillDetails({
      rows: calculatedRows,
      totalAmount,
      discount,
      labourWages,
      remaining,
    });
    setAmount(totalAmount);
    setFinalamount(remaining);
  };
  function updateDatabase(){
    if(!regularCustomer){
            fetch(`${process.env.REACT_APP_API_URI}/sellers/add`, {
            method: "POST",
            body: JSON.stringify({
                name:name,
                place:place,
                totalAmount: finalamount,
                transactions:[{
                    detail:"Bill - Amount",
                    date:"15-01-2025",
                    amount:finalamount}]
          
        }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update');
                res.json();
            })
            .then(data => {
                setNotification("Amount updated successfully!");
                setTimeout(() => setNotification(''), 3000);
            })
            .catch(err => {
                setNotification("Failed to update.");
                setTimeout(() => setNotification(''), 3000);
            });
        }
    else{
        fetch(`${process.env.REACT_APP_API_URI}/sellers/addamount`, {
            method: "PUT",
            body: JSON.stringify({
                name:name,
                place:place,
                amount: finalamount,
                detail:"Bill - Amount",
                date:"15-01-2025"
          
        }),
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
                setTimeout(() => setNotification(''), 3000);
            })
            .catch(err => {
                setNotification("Failed to update.");
                setTimeout(() => setNotification(''), 3000);
            });
    }
  }
  return (
    <Fragment>
        <style>{`
                body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f1f8e9;
      margin: 0;
      padding: 2rem;
    }

    h1 {
      text-align: center;
      color: #33691e;
      margin-bottom: 2rem;
    }

    .form-section, .bill-section {
      max-width: 800px;
      background: white;
      padding: 2rem;
      margin: auto;
      margin-bottom: 2rem;
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    label {
      display: block;
      margin: 1rem 0 0.3rem;
      font-weight: bold;
    }
            .top-notification {
                                position: fixed;
                                top: 0;
                                left: 50%;
                                transform: translateX(-50%);
                                background-color: #4caf50;
                                color: white;
                                padding: 1rem 2rem;
                                border-radius: 0 0 10px 10px;
                                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                                z-index: 9999;
                                animation: fadein 0.3s ease-in-out;
                            }

                            @keyframes fadein {
                                from { opacity: 0; top: -50px; }
                                to { opacity: 1; top: 0; }
                            }
    input[type="text"], input[type="number"] , input[type = "date"]{
      width: 95%;
      padding: 0.6rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .price-rows {
      margin-top: 1rem;
    }

    .price-rows .row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .price-rows input {
      flex: 1;
    }

    button {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
      border: none;
      background-color: #388e3c;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:hover {
      background-color: #2e7d32;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;
    }

    table, th, td {
      border: 1px solid #ccc;
    }

    th, td {
      padding: 0.8rem;
      text-align: center;
    }

    .totals {
      margin-top: 1.5rem;
    }

    .totals div {
      margin: 0.5rem 0;
      font-weight: bold;
    }

    .highlight {
      color: #d84315;
      font-size: 1.2rem;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    #regularCustomer{
      width: 15px;
      height: 15px;
      transform: scale(1.5); 
      cursor: pointer;
      margin-right: 8px;
      margin-top: 17px;
    }
      `}</style>
      {notification && (
            <div className="top-notification">
                {notification}
            </div>
        )}
                <h1>Seller Billing</h1>

                <div class="form-section">
                <label>Seller Name</label>
                <input type="text" id="sellerName" placeholder="Enter Seller Name" onChange={(e) => setName(e.target.value)}/>

                <label>Place</label>
                <input type="text" id="place" placeholder="Enter Place" onChange={(e)=>setPlace(e.target.value)}/>

                <label>Total Quantity</label>
                <input type="number" id="totalQty" placeholder="Enter Total Quantity" onChange={(e)=>setTotalQuantity(parseInt(e.target.value))}/>

                <label>Date</label>
                <input type="date" onChange={updateDate}/>

                <div class="price-rows" id="priceRows">
                        {rows.map((row, index) => (
                            <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                            <input
                                type="number"
                                placeholder="Price (Amount)"
                                value={row.price}
                                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={row.quantity}
                                onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                            />
                            </div>
                        ))}
                </div>

                <button onClick={addRow}>+ Add Rate & Sub-Quantity</button>

                <div class="checkbox-wrapper">
                    <label for="regularCustomer">Are you a Regular Customer?</label>
                    <input type="checkbox" id="regularCustomer" value="yes" onChange={(e)=>setRegularCustomer(e.target.checked)}/>
                </div>
                
                <button onClick={generateBill}>Generate Bill</button>
                </div>

                {billDetails && (<div class="bill-section" id="billSection" >
                    <h2>Billing Details</h2>
                    <table id="billTable">
                        <thead>
                        <tr>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                            {billDetails.rows.map((row, index) => (
                                <tr key={index}>
                                <td>{row.price}</td>
                                <td>{row.quantity}</td>
                                <td>{row.total}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><b>Total</b></td>
                                <td><b>{totalQuantity}</b></td>
                                <td><b>{amount}</b></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="totals" id="totals">
                        <div>Total Amount: ₹{billDetails.totalAmount}</div>
                        {(regularCustomer)?<div>Discount (2%): ₹{billDetails.discount}</div>:null}
                        <div>
                        Labour Wages (₹5 x {totalQuantity}): ₹{billDetails.labourWages}
                        </div>
                        <div className="highlight">
                        Final Amount: ₹{billDetails.remaining}
                        </div>
                    </div>
                    <button onClick={updateDatabase} style={{ marginTop: "20px", backgroundColor: "#1e88e5" }}>
                        Update Database
                    </button>
                </div>)}
    </Fragment>
  );
}

export default SellerBilling;
