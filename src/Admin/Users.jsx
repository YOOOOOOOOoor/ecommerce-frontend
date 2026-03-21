import React from "react";
import { useState, useEffect } from "react";
import API from "../Api/api.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFIlter] = useState({ search: "" });
  // const [totalProducts, setTotalProducts] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        params: { page: page, limit: 3, ...filter },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      // setTotalProducts(res.data.total);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const deleteUser = async (id) => {
    try {
      await API.delete(`/admin/users/delete/${id}`);
      await fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="part-admin">
      <div className="Top-part-admin">
        <div>
          <h2>User Management</h2>
          <p>Manage platform users, roles, and account permissions.</p>
        </div>
      </div>
      <div className="Bottom-part-admin">
        <div className="conatainer">
          <div className="search">
            <div>
              <input
                type="text"
                name=""
                id=""
                value={filter.search}
                onChange={(e) =>
                  setFIlter({ ...filter, search: e.target.value })
                }
              />
            </div>
          </div>
          <div className="idk">
            <p>User</p>
            <p>Email Address</p>
            <p>Role</p>
            <div></div>
          </div>
          <div className="users">
            {users.map((user) => (
              <div key={user.id} className="users-admin">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="prev-next">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span>
              {page}/{totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
