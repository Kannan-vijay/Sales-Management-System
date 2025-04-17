import {Fragment} from 'react'
import { Link } from 'react-router-dom'

export default function AccounterDashboard(){
    return <Fragment>
                <style>{`    * {
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
                        Accounter Dashboard
                    </header>

                    <section class="dashboard">
                        <Link to={'/farmerbilling'}>
                        <div class="card">
                            <h2>Farmer Billing</h2>
                            <p>Create and manage bills for farmers</p>
                        </div>
                        </Link>

                        <Link to={'/sellerbilling'}>
                        <div class="card">
                            <h2>Seller Billing</h2>
                            <p>Handle billing and payments for sellers</p>
                        </div>
                        </Link>

                        <Link to={'/sellerDetails'}>
                            <div class="card">
                                <h2>Seller Details</h2>
                                <p>View and manage all registered sellers</p>
                            </div>
                        </Link>
                    </section>
            </Fragment>
}