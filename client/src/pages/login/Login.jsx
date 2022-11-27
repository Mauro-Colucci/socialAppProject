import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (err) {
      setError(err.response.data)
    }
  };
  
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>You don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            {error}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
