import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';


const Details = () => {

    const [getcontactsdata, setcontactsdata] = useState([]);
    console.log(getcontactsdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {

        const res = await fetch(`/viewcontact/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setcontactsdata(data[0])
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            history.push("/");
        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Ishika</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getcontactsdata.id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getcontactsdata.id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">First_name: <span >{getcontactsdata.First_name}</span></h3>
                            <h3 className="mt-3">Middle_name: <span >{getcontactsdata.Middle_name}</span></h3>
                            <h3 className="mt-3">Last_name: <span >{getcontactsdata.Last_name}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getcontactsdata.Email}</span></p>
                          
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />PhoneNo1: <span>+91 {getcontactsdata.PhoneNo1}</span></p>
                            <p className="mt-5"><PhoneAndroidIcon />PhoneNo2: <span>+91 {getcontactsdata.PhoneNo2}</span></p>
                            <p className="mt-3"><LocationOnIcon />Adress: <span>{getcontactsdata.Adress}</span></p>
                           
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
