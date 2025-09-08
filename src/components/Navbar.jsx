import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ true if token exists
  }, []);
  // frontend logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect
  };

  return (
    <div className="nav">
      <h2>E-commerce Store</h2>
      {isLoggedIn ? (
        <a href="/" onClick={handleLogout} className="btn btn-danger">
          Logout
        </a>
      ) : (
        <>
          <a
            href="/login"
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
          >
            Login
          </a>
          <a href="/signup" className="btn btn-secondary">
            Signup
          </a>
        </>
      )}
    </div>
  );
}

export default Navbar;
