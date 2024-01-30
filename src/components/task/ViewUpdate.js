import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { child, get, ref, set } from "@firebase/database";
import { useParams } from "react-router-dom";

const ViewUpdate = () => {
  const params = useParams();
  console.log("component props", params);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    status: null,
    assigned_user: null,
    deadline: null
  });

  const getUserList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUserList(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getTaskDetails = () => {
      if (params && params.id) {
        get(child(ref(db), `tasks/${params.id}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              const data = snapshot.val();
              setFormData(data);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("Invalid params:", params);
      }
    };

    getUserList();
    getTaskDetails();
  }, [params]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(db, `tasks/${params.id}`), formData);
    alert("Details Updated");
  };


  return (
    <div className="container" onSubmit={handleSubmit}>
      <form>
        <div className="mb-3">
          <label htmlfor="exampleInputTitle1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle1"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputDescription1" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="exampleInputDescription1"
            rows={4}
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <div className="row">
          <div className="mb-3 col-lg-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-3 col-lg-3">
            <label htmlFor="user_assigned" className="form-label">
              User Assigned
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="user_assigned"
              onChange={handleChange}
              value={formData.user_assigned}
            >
              <option>Select User</option>
              {userList.map((item)=>{
                return(
                    <option key={item.id} value={item.email}>
                        {`${item.email}`}
                    </option>
                )
              })}
            </select>
          </div>

          <div className="col-lg-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              value={formData.deadline}
            />
          </div>
        </div>
        {/* row ends */}
              <div className="d-flex mt-3">
              <button type="submit" className="btn btn-success">
        Update Task
        </button>
              </div>
       
      </form>
    </div>
  );
};

export default ViewUpdate;
