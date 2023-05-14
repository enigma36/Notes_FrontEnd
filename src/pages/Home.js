import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  console.log("data=>", data);

  const onDeleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      toast.success(response.data);
    }
    getUsers();
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "Center" }}>No.</th>
            <th style={{ textAlign: "Center" }}>Title</th>
            <th style={{ textAlign: "Center" }}>Message</th>
            <th style={{ textAlign: "Center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.message}</td>
                  <td>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn_view">View</button>
                    </Link>
                    <Link to={`/edit/${item.id}`}>
                      <button className="btn_edit">Edit</button>
                    </Link>
                    <button
                      className="btn_delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
