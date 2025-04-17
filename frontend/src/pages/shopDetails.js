import {Fragment, useEffect, useState} from 'react'

export default function ShopDetails(){
    const [shopDetails,setShopDetails]=useState(null);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URI+'/shop/summary')
        .then(res => res.json())
        .then(res => setShopDetails(res));
    },[]);
    if(!shopDetails){
        return <p>loading...</p>
    }
    return <Fragment>
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

                            .shop-details {
                            max-width: 800px;
                            margin: auto;
                            background: white;
                            padding: 2rem;
                            border-radius: 10px;
                            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                            }

                            .metrics {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            margin-top: 1.5rem;
                            }

                            .metrics .card {
                            flex: 1 1 30%;
                            background-color: #e8f5e9;
                            margin: 0.5rem;
                            padding: 1rem;
                            border-left: 6px solid #33691e;
                            border-radius: 8px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                            text-align: center;
                            }

                            .card h2 {
                            font-size: 1.2rem;
                            margin-bottom: 0.5rem;
                            color: #2e7d32;
                            }

                            .card span {
                            font-size: 1.4rem;
                            font-weight: bold;
                            color: #1b5e20;
                            }

                            .summary {
                            text-align: center;
                            margin-top: 2rem;
                            font-size: 1.1rem;
                            color: #4e342e;
                            }

            `}</style>
                <h1>Shop Summary Details</h1>
                <div class="shop-details">
                <div class="metrics">
                    <div class="card">
                    <h2>Total Earnings</h2>
                    <span id="earnings">₹{shopDetails.totalSales}</span>
                    </div>
                    <div class="card">
                    <h2>Total Expenses</h2>
                    <span id="expenses">₹{shopDetails.totalExpenses}</span>
                    </div>
                    <div class="card">
                    <h2>Total Profit</h2>
                    <span id="profit">₹{shopDetails.profit}</span>
                    </div>
                </div>

                <div class="summary">
                    <p>Total Farmers Count: <strong id="farmersCount">{shopDetails.farmerCount}</strong></p>
                    <p>Total Sellers Count: <strong id="sellersCount">{shopDetails.sellerCount}</strong></p>
                </div>
                </div>

            </Fragment>
}