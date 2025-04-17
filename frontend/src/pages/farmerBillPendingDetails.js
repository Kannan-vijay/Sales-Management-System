import {Fragment} from 'react'
import { useEffect,useState } from 'react';
import FarmerBillPayementCard from '../components/farmerBillPaymentCard';

export default function FarmerBillPendingDetails(){
        const [farmers,setFarmers]=useState([]);
        const [loading,setLoading]=useState(false);
        const [name,setName] = useState("");
        useEffect(() => {
            fetch(process.env.REACT_APP_API_URI+'/farmers')
            .then(res => res.json())
            .then(res => setFarmers(res));
        },[]);
        function searchByDate(e) {
            const date = e.target.value;
        
            if (date) {
                console.log(date);
                const [year, month, day] = date.split("-");
                const reversedDate = `${day}-${month}-${year}`;
                setLoading(true);
        
                fetch(process.env.REACT_APP_API_URI + '/farmers/date/' + reversedDate)
                    .then(res => res.json())
                    .then(res => {
                        setFarmers(Array.isArray(res) ? res : []);
                        setLoading(false);
                    })
                    .catch(() => {
                        setFarmers([]);
                        setLoading(false);
                    });
            } else {
                setLoading(true);
                fetch(process.env.REACT_APP_API_URI + '/farmers')
                    .then(res => res.json())
                    .then(res => {
                        setFarmers(res);
                        setLoading(false);
                    })
                    .catch(() => {
                        setFarmers([]);
                        setLoading(false);
                    });
            }
        }
        function searchByName(e){
            if(name.length!=0){
                setLoading(true);
        
                fetch(process.env.REACT_APP_API_URI + '/farmers/search?name=' + name)
                    .then(res => res.json())
                    .then(res => {
                        setFarmers(Array.isArray(res) ? res : []);
                        setLoading(false);
                    })
                    .catch(() => {
                        setFarmers([]);
                        setLoading(false);
                    });
            } else {
                setLoading(true);
                fetch(process.env.REACT_APP_API_URI + '/farmers')
                    .then(res => res.json())
                    .then(res => {
                        setFarmers(res);
                        setLoading(false);
                    })
                    .catch(() => {
                        setFarmers([]);
                        setLoading(false);
                    });
            }
        }
    return <Fragment>
                <style>{`body {
                        margin: 0;
                        font-family: 'Segoe UI', sans-serif;
                        background-color: #f1f8e9;
                        color: #333;
                        }
                        .searchbtn{
                                    border-radius: 10px;
                                    border-color:rgb(221, 220, 217);
                                    width: 80px;
                                    font-family: 'Segoe UI', sans-serif;
                                }
                        header {
                        background-color: #558b2f;
                        color: white;
                        padding: 1rem;
                        text-align: center;
                        font-size: 1.8rem;
                        font-weight: bold;
                        }

                        .container {
                        max-width: 900px;
                        margin: 2rem auto;
                        padding: 0 1rem;
                        }

                        .search-bar {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 1rem;
                        margin-bottom: 2rem;
                        justify-content: space-between;
                        }

                        .search-bar input {
                        padding: 0.7rem 1rem;
                        font-size: 1rem;
                        border-radius: 8px;
                        border: 1px solid #ccc;
                        flex: 1;
                        min-width: 200px;
                        }

                        .farmer-card {
                        background-color: white;
                        border-radius: 10px;
                        padding: 1.5rem;
                        margin-bottom: 1rem;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                        border-left: 6px solid #8bc34a;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        }

                        .farmer-info {
                        flex: 1;
                        }

                        .farmer-name {
                        font-size: 1.4rem;
                        font-weight: bold;
                        color: #33691e;
                        }

                        .farmer-details {
                        font-size: 1rem;
                        margin-top: 0.3rem;
                        color: #555;
                        }

                        .bill-status {
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        font-weight: bold;
                        text-align: center;
                        min-width: 120px;
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

                        .paid {
                        background-color: #c8e6c9;
                        color: #256029;
                        border:none;
                        }

                        .not-paid-btn {
                        background-color: #ffcdd2;
                        color: #b71c1c;
                        border: none;
                        padding: 0.5rem 1.2rem;
                        font-size: 1rem;
                        font-weight: bold;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: 0.2s ease;
                        }

                        .not-paid-btn:hover {
                        background-color: #ef9a9a;
                        }

                        .no-results {
                        text-align: center;
                        color: #888;
                        margin-top: 2rem;
                        }
                        .link{
                        text-decoration:none;
                        color:inherit;
                        }
                                `}</style>
                <header>Farmer Details</header>

                <div class="container">
                <div class="search-bar">
                    <input type="text" id="searchName" placeholder="Search by name..." onChange={(e) => setName(e.target.value)}/>
                    <button className='searchbtn' onClick={searchByName}>search</button>
                    <input type="date" id="searchDate" onChange={searchByDate}/>
                </div>
                <div id="farmerList">
                    {farmers.length > 0 ? farmers.map(farmer => <FarmerBillPayementCard farmer={farmer} key={farmer.id} />) 
                                        : (!loading && <div className="no-results">No matching farmers found.</div>)}
                </div>
                </div>
            </Fragment>
};