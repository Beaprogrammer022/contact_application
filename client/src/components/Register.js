import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        First_name: "",
        Middle_name: "",
        Last_name: "",
        Email: "",
        PhoneNo1: "",
        PhoneNo2: "",
        Adress: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { First_name, Middle_name, Last_name, Email, PhoneNo1, PhoneNo2, Adress} = inpval;


        if (First_name == "") {
            alert("name is required")
        } else if (Email == "") {
            alert("email is required")
        } else if (!Email.includes("@")) {
            alert("enter valid email")
        }  else if (Last_name == "") {
            alert("Last_name is required")
        } else if (PhoneNo1 == "") {
            alert("mobile is required")
        } 
        else {

            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    First_name, Middle_name, Last_name, Email, PhoneNo1, PhoneNo2, Adress
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/")
                setUdata(data)
                console.log("data added");

            }
        }

    }

    return (
        <div className="container">
            <NavLink to="/">home</NavLink>
              <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">First_name</label>
                        <input type="text" value={inpval.First_name} onChange={setdata} name="First_name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Middle_name</label>
                        <input type="text" value={inpval.Middle_name} onChange={setdata} name="Middle_name" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Last_name</label>
                        <input type="text" value={inpval.Last_name} onChange={setdata} name="Last_name" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="email" value={inpval.Email} onChange={setdata} name="Email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PhoneNo1</label>
                        <input type="number" value={inpval.PhoneNo1} onChange={setdata} name="PhoneNo1" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PhoneNo2</label>
                        <input type="number" value={inpval.PhoneNo2} onChange={setdata} name="PhoneNo2" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Adress</label>
                        <textarea name="Adress" value={inpval.Adress} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;
