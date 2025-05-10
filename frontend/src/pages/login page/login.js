import {Fragment, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
    const [role,setRole] = useState("");
    const [userName,setuserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');

    function submissionHandler(){
        fetch(`${process.env.REACT_APP_API_URI}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    role: role,
                    userName: userName,
                    password: password
                })
            })
            .then(res => res.json().then(data => {
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to Check');
                }
                return data; 
            }))
            .then(res => {

                if (res.message === "Successfully Logged In") {
                    if (role === "Admin") {
                        navigate("/ownerdashboard");
                        setNotification("Logged As Admin");
                        setTimeout(() => setNotification(''), 3000);
                    } else {
                        navigate("/accounterdashboard");
                        setNotification("Logged As Accounter");
                        setTimeout(() => setNotification(''), 3000);
                    }
                }

                console.log(res.message);
            })
            .catch(error => {
                console.error("Login failed:", error.message);
                setNotification(error.message);
                setTimeout(() => setNotification(''), 3000);
            });
        }
    return <Fragment>
        <style>{`
                    body {
                        margin: 0;
                        padding: 0;
                        background: #e8f5e9;
                        font-family: 'Segoe UI', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        }

                        .login-container {
                        background: white;
                        padding: 2.5rem;
                        border-radius: 15px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 400px;
                        }

                        .login-container h2 {
                        text-align: center;
                        margin-bottom: 1.5rem;
                        color: #2e7d32;
                        }

                        .form-group {
                        margin-bottom: 1.2rem;
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

                        .form-group label {
                        display: block;
                        margin-bottom: 0.5rem;
                        color: #333;
                        }

                        .form-group input,
                        .form-group select {
                        width: 100%;
                        padding: 0.8rem;
                        border-radius: 8px;
                        border: 1px solid #ccc;
                        }
                        .form-group input{
                        width : 90%;
                        }

                        .form-group select {
                        background-color: #fff;
                        }

                        .login-btn {
                        width: 100%;
                        padding: 0.9rem;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background-color 0.3s;
                        }

                        .login-btn:hover {
                        background-color: #388e3c;
                        }

                        .extra-btns {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 1rem;
                        }

                        .btn {
                            
                            margin: 5px;
                            margin-top: 10px;
                        width: 100%;
                        padding: 0.8rem;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background-color 0.3s;
                        text-align: center;
                        }

                        .btn:hover {
                        background-color: #1b5e20;
                        }
            `}</style>
                    {notification && (
                        <div className="top-notification">
                            {notification}
                        </div>
                    )}
                    <div className="login-container">
                        <h2>Login</h2>
                        <form action={submissionHandler} method="POST">
                        <div className="form-group">
                            <label for="role">Login as:</label>
                            <select id="role" name="role" required onChange={(e)=>setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Accounter">Accounter</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" 
                            onChange={(e)=>setuserName(e.target.value)}
                            placeholder="Enter your username" required />
                        </div>

                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password" required />
                        </div>

                        <button className="login-btn" type="submit">Login</button>

                            <Link to = "/sellers">
                                <button className="btn" >Seller</button>
                            </Link>
                            <Link to = "/farmers" >
                                <button className="btn">Farmer</button>
                            </Link>
                            
                        </form>
                    </div>
            </Fragment>
}