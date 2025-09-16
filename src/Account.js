import React from "react";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Account Page</h2>

              {user ? (
                <div>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="rounded-circle mb-3"
                      width={100}
                      height={100}
                    />
                  )}
                  <h5 className="card-text">{user.displayName}</h5>
                  {user.email && <p className="text-muted">{user.email}</p>}
                </div>
              ) : (
                <p className="card-text">
                  Please sign in to view your account.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
