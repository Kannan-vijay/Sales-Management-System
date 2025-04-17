import {Fragment} from 'react'
import { Link } from 'react-router-dom'

export default function OwnerDashboard(){
    return <Fragment>
                <style>{`
                            * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            font-family: 'Segoe UI', sans-serif;
                            }

                            body {
                            background-color: #f1f8e9;
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            }

                            header {
                            background-color: #33691e;
                            color: white;
                            padding: 1.5rem;
                            text-align: center;
                            font-size: 2rem;
                            font-weight: bold;
                            }

                            .dashboard {
                            flex: 1;
                            padding: 3rem;
                            display: flex;
                            flex-direction: column;
                            gap: 2rem;
                            }

                            .card {
                            background-color: white;
                            border-radius: 15px;
                            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                            padding: 3rem;
                            width: 100%;
                            text-align: center;
                            transition: transform 0.3s ease, box-shadow 0.3s ease;
                            cursor: pointer;
                            }

                            .card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
                            }

                            .card h2 {
                            font-size: 2rem;
                            color: #2e7d32;
                            margin-bottom: 1rem;
                            }

                            .card p {
                            font-size: 1.1rem;
                            color: #555;
                            }

                            a {
                            text-decoration: none;
                            color: inherit;
                            }

                            @media (max-width: 600px) {
                            .dashboard {
                                padding: 1rem;
                                gap: 1.5rem;
                            }

                            .card {
                                padding: 2rem;
                            }
                            }
            `}</style>
                  <header>
                        Owner Dashboard
                    </header>

                    <section class="dashboard">
                        <Link to={'/shopDetails'}>
                        <div class="card">
                            <h2>Shop Details</h2>
                            <p>To the Shop Details like total transactions, profit etc..</p>
                        </div>
                        </Link>

                        <Link to={'/sellerDetails'}>
                        <div class="card">
                            <h2>Seller Details</h2>
                            <p>To see the Seller Details and update the seller Credit Amount</p>
                        </div>
                        </Link>

                        <Link to={'/farmerBillPayement'}>
                        <div class="card">
                            <h2>Farmer Details</h2>
                            <p>To see the Farmer Details and Pay the Farmer Bill</p>
                        </div>
                        </Link>

                    </section>
            </Fragment>
}