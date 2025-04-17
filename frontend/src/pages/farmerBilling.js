import React, { Fragment, useState } from "react";

function FarmerBilling() {
  const [rows, setRows] = useState([{ price: "", quantity: "" }]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [advance, setAdvance] = useState(0);
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
    let totalAmount = 0;
    let labourWages = 5 * totalQuantity;

    const calculatedRows = rows.map(({ price, quantity }) => {
      const priceNum = parseFloat(price) || 0;
      const quantityNum = parseFloat(quantity) || 0;
      const total = priceNum * quantityNum;
      totalAmount += total;
      return { price: priceNum, quantity: quantityNum, total };
    });
    
    const commission = Math.floor(totalAmount / 10);
    const remaining = totalAmount - (commission + labourWages + advance);
    

    setBillDetails({
      rows: calculatedRows,
      totalAmount,
      commission,
      labourWages,
      remaining,
    });
    setFinalamount(totalAmount);
    setAmount(remaining);
  };
  function updateDatabase(){
    const rate = billDetails.rows.map(row => parseInt(row.price, 10));
    const quantity = billDetails.rows.map(row => parseInt(row.quantity, 10));
    fetch(`${process.env.REACT_APP_API_URI}/farmers/add`, {
      method: "POST",
      body: JSON.stringify({ name,place,date,amount,quantity,rate,totalQuantity,advance }),
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
  return (
    <Fragment>
        <style>{`
            body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f1f8e9; /* Soft green background */
        margin: 0;
        padding: 2rem;
      }

      h1 {
        text-align: center;
        color: #33691e; /* Dark green for the main header */
        margin-bottom: 2rem;
      }

      .form-section, .bill-section {
        max-width: 800px;
        background: white;
        padding: 2rem;
        margin: auto;
        margin-bottom: 2rem;
        border-radius: 10px; /* Rounded edges */
        box-shadow: 0 8px 16px rgba(0,0,0,0.1); /* Subtle shadow effect */
      }

      label {
        display: block;
        margin: 1rem 0 0.3rem;
        font-weight: bold;
        color: #333; /* Dark text for labels */
      }

      input[type="text"],
      input[type="number"],
      input[type="date"] {
        width: 100%;
        padding: 0.6rem;
        margin-top: 5px;
        border-radius: 5px; /* Rounded edges for inputs */
        border: 1px solid #ccc; /* Neutral border color */
        font-size: 1rem;
      }

      .price-rows {
        margin-top: 1rem;
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
      .price-rows div {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .price-rows input {
        flex: 1;
        padding: 0.6rem;
        border-radius: 5px; /* Rounded edges for inputs */
        border: 1px solid #ccc;
      }

      button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        border: none;
        background-color: #388e3c; /* Green for action buttons */
        color: white;
        border-radius: 5px; /* Rounded edges */
        cursor: pointer;
        margin-top: 1rem;
      }

      button:hover {
        background-color: #2e7d32; /* Slightly darker green for hover state */
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
        color: #d84315; /* Red for highlighting critical information */
        font-size: 1.2rem;
      }

      .update {
        margin-top: 20px;
        background-color: #1e88e5; /* Blue color for the update button */
        padding: 0.8rem 1.5rem;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .update:hover {
        background-color: #1565c0; /* Slightly darker blue on hover */
      }
      `}</style>
      {notification && (
            <div className="top-notification">
                {notification}
            </div>
        )}
    <div>
      <h1>Farmer Billing</h1>

      <div className="form-section">
        <label>Farmer Name:</label>
        <input type="text" placeholder="Enter Farmer Name" value={name} onChange={(e)=>setName(e.target.value)}/>

        <label>Place:</label>
        <input type="text" placeholder="Enter Place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
        <label>Date:</label>
        <input type="date" onChange={updateDate}/>

        <label>Total Quantity:</label>
        <input
          type="number"
          placeholder="Enter Total Quantity"
          onChange={(e) => setTotalQuantity(parseFloat(e.target.value) || 0)}
        />

        <div className="price-rows">
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

        <button onClick={addRow}>+ Add Price & Quantity</button>

        <label>Advance Amount:</label>
        <input
          type="number"
          placeholder="Enter Advance Amount"
          onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
        />

        <button onClick={generateBill}>Generate Bill</button>
      </div>

      {billDetails && (
        <div className="bill-section">
          <h2>Billing Details</h2>
          <table>
            <thead>
              <tr>
                <th>Price</th>
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
                <td><b>{finalamount}</b></td>
              </tr>
            </tbody>
          </table>

          <div className="totals">
            <div>Total Amount: ₹{billDetails.totalAmount}</div>
            <div>Commission (10%): ₹{billDetails.commission}</div>
            <div>
              Labour Wages (₹5 x {totalQuantity}): ₹{billDetails.labourWages}
            </div>
            <div>Advance Paid: ₹{advance}</div>
            <div className="highlight">
              Remaining Amount: ₹{billDetails.remaining}
            </div>
          </div>
          <button onClick={updateDatabase} style={{ marginTop: "20px", backgroundColor: "#1e88e5" }}>
            Update Database
          </button>
        </div>
      )}
    </div>
    </Fragment>
  );
}

export default FarmerBilling;
