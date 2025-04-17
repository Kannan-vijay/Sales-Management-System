import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FarmerBillDetails() {
  const [billDetails, setBillDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/farmers/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => setBillDetails(res))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!billDetails) return <p>Loading...</p>;

  const totalAmount = billDetails.quantity.reduce(
    (sum, qty, idx) => sum + qty * billDetails.rate[idx],
    0
  );
  const totalQuantity = billDetails.quantity.reduce((sum, qty) => sum + qty, 0);
  const commission = Math.floor(totalAmount / 10);
  const labourWages = 5 * totalQuantity;
  const ad=(billDetails.advance)?billDetails.advance:0;
  const remaining = totalAmount - (commission + labourWages + ad);

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

        .bill-section {
          max-width: 800px;
          background: white;
          padding: 2rem;
          margin: auto;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .info {
          margin-bottom: 1.5rem;
        }

        .info div {
          margin: 0.4rem 0;
          font-weight: bold;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        th,
        td {
          padding: 0.8rem;
          text-align: center;
          border: 1px solid #ccc;
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
      `}</style>
      <h1>Farmer Bill Details</h1>

      <div className="bill-section">
        <div className="info">
          <div>Name: <span id="farmerName">{billDetails.name}</span></div>
          <div>Place: <span id="farmerPlace">{billDetails.place}</span></div>
        </div>

        <table id="billTable">
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {billDetails.quantity.map((qty, idx) => (
              <tr key={idx}>
                <td>{billDetails.rate[idx]}</td>
                <td>{qty}</td>
                <td>{billDetails.rate[idx] * qty}</td>
              </tr>
            ))}
            <tr>
                <td><b>Total</b></td>
                <td><b>{totalQuantity}</b></td>
                <td><b>₹{totalAmount}</b></td>
            </tr>
          </tbody>
        </table>

        <div className="totals" id="totals">
          <div>Commission (10%): ₹{commission}</div>
          <div>Labour Wages (₹5 x {totalQuantity}): ₹{labourWages}</div>
          <div>Advance Amount: ₹{ad}</div>
          <div className="highlight">Remaining Amount: ₹{remaining}</div>
        </div>
      </div>
    </Fragment>
  );
}
