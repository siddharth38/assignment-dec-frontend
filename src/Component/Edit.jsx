import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Edit = () => {
  const [user, setuser] = useState({
    _id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    project: "",
  });
  const { id } = useParams();
  useEffect(() => {
    getedit();
  }, []);
  const getedit = () => {
    console.log("called");
    const _id = { id: id };
    axios
      .post(`http://localhost:3001/auth/getuser`, _id)
      .then((res) => {
        console.log(res.data);
        setuser({
          ...user,
          _id: res.data._id,
          name: res.data.name,
          lastname: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          project: res.data.project,
        });
      })
      .catch((err) => console.log(err));
  };
  const changehandler = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
  const submithandler = () => {
    const { name, lastname, email, phone, project } = user;
    if (name && lastname && email && phone && project) {
      console.log(user);
      axios.put(`http://localhost:3001/auth/update`, user).then((res) => {
        console.log(res.data.message.message);
        alert(res.data.message);
      });
    } else {
      alert("all field required");
    }
  };

  return (
    <div>
      <div className="login">
        <h3> Edit client</h3>
        <div>Name</div>
        <input name="name" value={user.name} onChange={changehandler} />
        <div>lastname</div>
        <input name="lastname" value={user.lastname} onChange={changehandler} />
        <div>Email</div>
        <input name="email" value={user.email} onChange={changehandler} />
        <div>Phone</div>
        <input name="phone" value={user.phone} onChange={changehandler} />
        <div>project</div>
        <input name="project" value={user.project} onChange={changehandler} />
        <div>
          <button onClick={submithandler}>Edit</button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Edit;
