import { useEffect, useState } from "react";

export const Actions = () => {
  let [users, setUsers] = useState([]);
  let [userLength, setUserLength] = useState(null);

  // โหลดข้อมูลผู้ใช้
  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // เพิ่มผู้ใช้
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUsers([{ id: data.id, ...newUser }, ...users]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  // เปิดโหมดแก้ไข
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) user.isEditing = true;
      else user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // ยกเลิกแก้ไข
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // อัปเดตผู้ใช้
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              user.user_date = userData.user_date;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  // ลบผู้ใช้
  const deleteUser = (theID) => {
    let userDeleted = users.filter((user) => user.id !== theID);
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) setUserLength(0);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
  };
};
