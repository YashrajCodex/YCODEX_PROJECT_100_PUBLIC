import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  // const user = FAKE_USER;

  const { user, logout } = useAuth();
  const Navigate = useNavigate();

  function handleClick() {
    logout();
    Navigate('/')
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
