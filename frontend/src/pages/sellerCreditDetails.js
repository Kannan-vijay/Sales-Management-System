import {Fragment, useEffect, useState} from 'react'
import SellerCreditCard from '../components/sellerCreditCard';

export default function SellerCreditDetails(){
    const [sellers,setSellers]=useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URI+'/sellers')
        .then(res => res.json())
        .then(res => setSellers(res));
    },[]);
    return <Fragment>
                <style>{`
                           body {
                            margin: 0;
                            font-family: 'Segoe UI', sans-serif;
                            background-color: #f1f8e9;
                            color: #333;
                            }

                            header {
                            background-color: #388e3c;
                            color: white;
                            padding: 1rem;
                            text-align: center;
                            font-size: 1.8rem;
                            font-weight: bold;
                            }

                            .container {
                            max-width: 800px;
                            margin: 2rem auto;
                            padding: 0 1rem;
                            }

                            .seller-card {
                            background-color: white;
                            border-radius: 12px;
                            padding: 1.5rem;
                            margin-bottom: 1.2rem;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            transition: 0.3s;
                            }

                            .seller-card:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                            }

                            .credit-section {
                            margin-top: 1rem;
                            display: flex;
                            gap: 0.5rem;
                            align-items: center;
                            }

                            .credit-section input {
                            padding: 0.5rem;
                            border: 1px solid #ccc;
                            border-radius: 6px;
                            flex: 1;
                            font-size: 1rem;
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
                            .credit-section button {
                            background-color: #43a047;
                            color: white;
                            border: none;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: 0.2s;
                            }

                            .credit-section button:hover {
                            background-color: #388e3c;
                            }

                            .credit-display {
                            margin-top: 0.3rem;
                            font-size: 0.95rem;
                            color: #777;
                            }
                            .link{
                                text-decoration:none;
                                color:inherit;
                                font-weight: bold;
                                color: #2e7d32;
                                font-size: 1.4rem;
                            }
                            .seller-name {
                            font-size: 1.4rem;
                            font-weight: bold;
                            color: #2e7d32;
                            }

                            .seller-place {
                            font-size: 1.1rem;
                            margin-top: 0.4rem;
                            color: #555;
                            }


            `}</style>
                <header>Seller Details</header>
                <div class="container">
                    {sellers.map(seller => <SellerCreditCard seller={seller}/>)}
                </div>
            </Fragment>
}