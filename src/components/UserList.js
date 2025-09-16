import { useContext, useState } from "react";
import { AppContext } from "../Context";

const UserList = () => {
  const { users, userLength, editMode, cancelEdit, updateUser, deleteUser } =
    useContext(AppContext);

  const [newData, setNewData] = useState({});

  const saveBtn = () => updateUser(newData);

  const updateNewData = (e, field) => {
    setNewData({ ...newData, [field]: e.target.value });
  };

  const enableEdit = (id, user_name, user_email, user_date) => {
    setNewData({ id, user_name, user_email, user_date });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) deleteUser(id);
  };

  if (!userLength)
    return <p>{userLength === null ? "Loading..." : "No users."}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, user_name, user_email, user_date, isEditing }) => (
          <tr key={id}>
            {isEditing ? (
              <>
                <td>
                  <input
                    type="text"
                    defaultValue={user_name}
                    onChange={(e) => updateNewData(e, "user_name")}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    defaultValue={user_email}
                    onChange={(e) => updateNewData(e, "user_email")}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    defaultValue={user_date}
                    onChange={(e) => updateNewData(e, "user_date")}
                  />
                </td>
                <td>
                  <button onClick={saveBtn}>Save</button>
                  <button onClick={() => cancelEdit(id)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{user_name}</td>
                <td>{user_email}</td>
                <td>{user_date}</td>
                <td>
                  <button
                    onClick={() =>
                      enableEdit(id, user_name, user_email, user_date)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteConfirm(id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
