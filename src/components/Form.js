import { useState, useContext } from "react";
import { AppContext } from "../Context";

const Form = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // เก็บค่าจาก input form
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // ส่งข้อมูลไป insert
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Insert User</h2>

      <label htmlFor="_name">Name</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />

      <label htmlFor="_email">Email</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Enter email"
        autoComplete="off"
        required
      />

      <label htmlFor="_date">Date</label>
      <input
        type="date"
        id="_date"
        onChange={(e) => addNewUser(e, "user_date")}
        required
      />

      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;
