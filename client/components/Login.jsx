import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";



const Login = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            console.log("response===", response);

            if (response.ok == true && response.status == 200) {
                const data = await response.json();
                storeTokenInLS(data.token);
                navigate("/home");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return <>
        <section className="logContainer">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                    <h1 className="opacity">LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="EMAIL" />
                        <input type="password" name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="PASSWORD" />
                        <button className="opacity" type="submit">SUBMIT</button>
                    </form>
                    <div className="register-forget opacity">
                        <NavLink to="/signup">REGISTER</NavLink>
                        <a href="#!">FORGOT PASSWORD</a>
                    </div>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    </>
}

export default Login;