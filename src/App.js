import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container text-success p-3 mt-3 mb-3">
      <div className="row justify-content-md-center">
        <div className="col-3 border p-3 bg-dark">1 of 3</div>
        <div className="col-md-auto border p-3 bg-dark">
          Variable width content
        </div>
        <div className="col-3 border p-3 bg-dark">3 of 3</div>
      </div>
      <div className="row mt-3">
        <div className="col border border-danger bg-secondary p-3">1 of 3</div>
        <div className="col-md-auto border border-danger bg-dark p-3">
          Variable width content
        </div>
        <div className="col col-lg-2 border p-3 bg-dark">3 of 3</div>
      </div>
    </div>
  );
}

export default App;
