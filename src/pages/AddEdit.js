import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  message: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { title, message } = state;

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addNote = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success("Note added");
    }
  };

  const updateNote = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success("Note updated");
    }
  };

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, []);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) {
      toast.warning("Please fill in all fields");
    } else {
      if (id) {
        updateNote(state, id);
      } else {
        addNote(state);
      }
      setTimeout(() => navigate("/"), 5000);
    }
  };

  return (
    <div style={{ matginTop: "150px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h2 style={{ textAlign: "center" }}>{id ? "Update User" : "Add User"}</h2>
        <div className="title-container">
          <label for="title">Title</label>
          <input
            type="text"
            className="title-input"
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="message-container">
          <label for="message">Message</label>
          <input
            type="text"
            className="message-input"
            placeholder="Enter Message"
            name="message"
            value={message}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn-submit"
          value={id ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default AddEdit;
