import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const history = useNavigate();
  const [click, setclick] = useState("click");
 
  useEffect(() => {
    getdata();
  }, [click]);
  const [user, setuser] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    project: "",
  });

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
      axios.post(`http://localhost:3001/auth/login`, user).then((res) => {
        alert(res.data.messsage);
        if (click == "click") setclick("noclicked");
        else setclick("click");
      });
    } else {
      alert("all field required");
    }
  };

  const [users, setusers] = useState([{}]);
  const getdata = async () => {
    const response = await axios.get(`http://localhost:3001/auth/alluser`);
    console.log(response.data);
    setusers(response.data);
  };

  const deletehandler = (e) => {
    axios
      .delete(`http://localhost:3001/auth/delete/${e.target.id}`)
      .then((res) => {
        alert(res.data.message);
        if (click == "click") setclick("noclicked");
        else setclick("click");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="login">
        <h3> Create client</h3>
        <div>Name</div>
        <input name="name" value={user.name} onChange={changehandler} />
        <div>lastnameame</div>
        <input name="lastname" value={user.lastname} onChange={changehandler} />
        <div>Email</div>
        <input name="email" value={user.email} onChange={changehandler} />
        <div>Phone</div>
        <input name="phone" value={user.phone} onChange={changehandler} />
        <div>project</div>
        <input name="project" value={user.project} onChange={changehandler} />
        <div>
          <button onClick={submithandler}>Submit</button>
        </div>
      </div>

      {users
        ? users.map((todos, id) => (
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">{id}</th>
                  <td>{todos.name}</td>
                  <td>{todos.email}</td>
                  <td>{todos.phone}</td>
                  <td>{todos.project}</td>
                  <td>
                    <Link to={`/edit/${todos._id}`}> Edit</Link>
                  </td>
                  <td onClick={deletehandler}>
                    <Link id={todos._id}> Delete</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        : "No data"}
    </div>
  );
};

export default Home;
