import React from "react";
import { useAuth } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Welcome, {user ? user.displayName : "Guest"}!
              </h2>
              {user ? (
                <>
                  <p className="card-text">Email: {user.email}</p>
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="img-fluid rounded-circle"
                  />
                  <br />
                  <button
                    className="btn btn-danger btn-block"
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <section className="bg-info p-3 m-2 rounded">
                    <p className="card-text text-center mb-4">
                      Please sign in to access your account.
                    </p>
                    {/* Sample login form */}
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </form>
                    {/* Sign in with Google button */}
                    <button
                      className="btn btn-primary btn-block mt-3"
                      onClick={signInWithGoogle}
                    >
                      Sign In with Google
                    </button>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
