import { useState } from "react";
import "./UserInput.css";
import Axios from 'axios';
import {Table} from 'reactstrap';

function UserInput() {

    const [name, setName] = useState ("");
    const [email, setEmail] = useState ("");
    const [phone, setPhone] = useState("");
    

    const [userList, setUserList] = useState ([]);

    const addUser = () => {
        Axios.post('http://localhost:3001/create', {name: name, email: email, phone : phone}).then(() => {
            setUserList([...userList, {
                name: name, email: email, phone : phone,
            },
            ]);
        });
    };

    const getUser = () => {
        Axios.get('http://localhost:3001/getuser').then((response) => {
            setUserList(response.data);
        });
    };

    return(
        <div className = "info">
            <label>Name: </label>
            <input type = "text" onChange = {(e) => setName(e.target.value)}></input>
            <label>Email: </label>
            <input type = "text" onChange = {(e) => setEmail(e.target.value)}></input>
            <label>Phone Number: </label>
            <input type = "tel"  maxlength = "10" onChange={(e) => { setPhone(e.target.value)}}></input>
            
            <button onClick={addUser}>Add User</button>
            
            <button onClick={getUser}>List Of User</button>
            
            <Table className = "data-table">
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
           <tbody>
            {userList.map((val, key) => {
                return <tr>
                  <td>{val.name} </td>
                  <td> {val.email} </td> 
                  <td>{val.phone} </td> 
                   </tr>
            })}
            </tbody>
             </Table>
        </div>

    );
}

export default UserInput;