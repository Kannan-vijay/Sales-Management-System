import {Fragment, useEffect, useState} from 'react'
import SellerCard from '../components/sellerCard';

export default function SellerDetails(){
    const [sellers,setSellers]=useState([]);
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URI+'/sellers')
        .then(res => res.json())
        .then(res => setSellers(res));
    },[]);

    function searchByName(){
        if(name.length!==0){
            setLoading(true);
    
            fetch(process.env.REACT_APP_API_URI + '/sellers/search?name=' + name)
                .then(res => res.json())
                .then(res => {
                    setSellers(Array.isArray(res) ? res : []);
                    setLoading(false);
                })
                .catch(() => {
                    setSellers([]);
                    setLoading(false);
                });
        } else {
            setLoading(true);
            fetch(process.env.REACT_APP_API_URI + '/sellers')
                .then(res => res.json())
                .then(res => {
                    setSellers(res);
                    setLoading(false);
                })
                .catch(() => {
                    setSellers([]);
                    setLoading(false);
                });
        }
    }
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
                            font-size: 2rem;
                            font-weight: bold;
                            }

                            .container {
                            max-width: 800px;
                            margin: 2rem auto;
                            padding: 0 1rem;
                            }

                            .search-bar {
                            margin-bottom: 2rem;
                            text-align: center;
                            }

                            .search-bar input {
                            width: 90%;
                            max-width: 500px;
                            padding: 0.5rem;
                            font-size: 1rem;
                            border-radius: 8px;
                            border: 1px solid #ccc;
                            }

                            .seller-card {
                            background-color: white;
                            border-radius: 12px;
                            padding: 1.5rem 2rem;
                            margin-bottom: 1rem;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            transition: 0.3s;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 1.5rem;
                            }

                            .seller-card:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                            }

                            .seller-name {
                            font-weight: bold;
                            color: #2e7d32;
                            }

                            .seller-place {
                            color: #555;
                            }

                            a {
                            text-decoration: none;
                            color: inherit;
                            }
                            .search-bar {
                        margin-bottom: 2rem;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        gap: 1rem; /* Add space between input and button */
                        }

                        .search-bar button {
                        padding: 0.5rem 1rem;
                        font-size: 1rem;
                        border-radius: 8px;
                        background-color: #388e3c;
                        color: white;
                        border: none;
                        cursor: pointer;
                        transition: 0.3s;
                        }

                        .search-bar button:hover {
                        background-color: #2e7d32;
                        }
                        .no-results {
                                text-align: center;
                                color: red;
                                margin-top: 2rem;
                                }
            `}</style>
                <header>Seller Details</header>
                <div class="container">
                    <div class="search-bar">
                        <input type="text" id="searchInput" placeholder="Search by name or place..." onChange={(e)=>setName(e.target.value)}/>
                        <button id="searchButton" onClick={searchByName}>Search</button>
                    </div>
                    {sellers.length>0 ? sellers.map(seller => <SellerCard seller={seller}/>) : 
                    (!loading)&& <div className="no-results">No matching Sellers found.</div>}
                </div>
            </Fragment>
}