import { useState } from "react";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";
import "./css/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">

      {/* Decorative Background */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      {/* Food Images */}
      <img
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
        className="food-img pizza"
        alt="Pizza"
      />

      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
        className="food-img salad"
        alt="Salad"
      />

      <img
        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
        className="food-img burger"
        alt="Burger"
      />

      <img
        src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=500"
        className="food-img pasta"
        alt="Pasta"
      />

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <div className="overlay">

            <div className="brand">
              🍴 FoodExpress
            </div>

            <h1>
              Delicious Food
              <br />
              Delivered
              <span> Fast.</span>
            </h1>

            <p>
              Discover hundreds of restaurants, fast delivery,
              secure ordering and delicious meals delivered
              right to your doorstep.
            </p>

            <div className="features">

              <div className="feature-card">
                ⭐
                <div>
                  <h3>4.9 Rating</h3>
                  <span>Thousands of reviews</span>
                </div>
              </div>

              

              <div className="feature-card">
                🍔
                <div>
                  <h3>500+ Restaurants</h3>
                  <span>All cuisines available</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-right">

          <div className="login-card">

            <div className="card-top">

              <h2>
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p>
                {isLogin
                  ? "Login to continue ordering your favourite meals."
                  : "Join FoodExpress and start ordering today."}
              </p>

            </div>

            <div className="auth-header">

              <button
                className={isLogin ? "active" : ""}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>

              <button
                className={!isLogin ? "active" : ""}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>

            </div>

            <div className="auth-body">

              {isLogin ? (
                <LoginUser />
              ) : (
                <RegisterUser
                  onRegisterSuccess={() => setIsLogin(true)}
                />
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}