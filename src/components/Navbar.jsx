import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const logout=()=>{
    sessionStorage.clear();
    window.location.href = "/";
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.link}>MyApp</Link>
      </div>
      <ul style={styles.navItems}>


        <li><Link to="/home" style={styles.link}>Home</Link></li>
        <li><Link to="/create" style={styles.link}>Create Account</Link></li>
        <li><Link to="/fetch" style={styles.link}>Fetch data</Link></li>
        <li><Link to="/deposit" style={styles.link}>Deposit Fund </Link></li>
        <li><Link to="/withdrawal" style={styles.link}>Withdrawal </Link></li>
        <li><Link to="/update" style={styles.link}>Update User</Link></li>
        
        <button onClick={logout}>Logout</button>
        
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#333",
    color: "#fff",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navItems: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  }
};

export default Navbar;
