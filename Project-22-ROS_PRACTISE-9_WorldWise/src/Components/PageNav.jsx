import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../Contexts/FakeAuthContext";

export default function PageNav() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {!isAuthenticated ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <>
              <img src={user.avatar} alt={user.name} style={{height: '4rem', borderRadius: '100px'}}/>
              <span style={{fontSize: '1.6rem', fontWeight: '600'}}> {user.name}</span>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
