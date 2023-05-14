import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [state, setState] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleNote(id);
    }
  }, [id]);

  const getSingleNote = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  return (
    <div className="view">
        <div className="view_header">
            <h1>{state?.title}</h1>
        </div>
        <div className="view_body">
            <p>{state?.message}</p>
        </div>
        <div className="view_footer">
            <Link to={`/edit/${state?.id}`}>
                <button className="btn_edit">Edit</button>
            </Link>
        </div>
    </div>

  )
};

export default View;
