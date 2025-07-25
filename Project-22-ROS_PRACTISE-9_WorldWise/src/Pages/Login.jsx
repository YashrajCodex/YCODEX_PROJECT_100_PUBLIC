import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../Components/PageNav";
import { useAuth } from "../Contexts/FakeAuthContext";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth()
  const Navigate = useNavigate();

  useEffect(function () { 
    if(isAuthenticated) Navigate('/App', {replace: true})
  }, [isAuthenticated, Navigate])
  function loginHere(e) {
    e.preventDefault()
    if (!email && !password) return;

    login(email, password)
  }
  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit = {loginHere}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type= 'primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
