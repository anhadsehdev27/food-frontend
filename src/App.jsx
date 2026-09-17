import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/Orders?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/Orders");
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          🍽️ <span>FoodExpress</span>
        </div>

        <nav>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/ListItem");
            }}
            style={{ cursor: "pointer" }}
          >
            Menu
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/ListRestaurant");
            }}
            style={{ cursor: "pointer" }}
          >
            Restaurants
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Orders");
            }}
            style={{ cursor: "pointer" }}
          >
            Orders
          </a>

          <a href="#">Contact</a>
        </nav>

        {/* NEW: Navbar Search Bar (between Contact and Login) */}
        <div className="nav-search-container">
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="nav-search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <section className="hero">
        <div className="hero-left">
          <h1>
            Delicious Food <br />
            Order <span>Now</span>
          </h1>

          <p>Order from your favorite restaurants.</p>

          

          <div className="hero-buttons">
            <button className="order-btn" onClick={() => navigate("/Orders")}>
              Order Now
            </button>

            <button className="menu-btn" onClick={() => navigate("/ListItem")}>
              Browse Menu
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700"
            alt="Food"
          />
        </div>
      </section>

      <section className="features">
        <div className="card" onClick={() => navigate("/Orders")} style={{ cursor: "pointer" }}>
          <h3>🚀 Served Fresh</h3>
          <p>Fresh meals delivered</p>
        </div>

        <div className="card" onClick={() => navigate("/ListRestaurant")} style={{ cursor: "pointer" }}>
          <h3>🍔 100+ Restaurants</h3>
          <p>Choose from hundreds of restaurants near you.</p>
        </div>

        <div className="card" onClick={() => navigate("/payment")} style={{ cursor: "pointer" }}>
          <h3>💳 Secure Payment</h3>
          <p>Multiple payment methods with secure checkout.</p>
        </div>

        <div className="card" onClick={() => navigate("/restaurant")} style={{ cursor: "pointer" }}>
          <h3>⭐ Top Rated</h3>
          <p>Only highly rated restaurants and delicious meals.</p>
        </div>
      </section>

      <section className="popular">
        <h2>Popular Categories</h2>

        <div className="categories">
          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🍕 Pizza
          </div>

          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🍔 Burgers
          </div>

          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🍜 Noodles
          </div>

          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🥗 Healthy
          </div>

          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🍰 Desserts
          </div>

          <div className="category" onClick={() => navigate("/ListItem")} style={{ cursor: "pointer" }}>
            🥤 Drinks
          </div>
        </div>
      </section>

      <footer>
        <h3>FoodExpress</h3>
        <p>Fresh Food • Happy Customers</p>
        <p>© 2026 FoodExpress. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;
