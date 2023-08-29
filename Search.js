import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Footer } from "react-bootstrap/lib/Modal";
import { useSearchParams } from "react-router-dom";


function Search() {
    const [data,setdata]=useState([]);
    const [input]=useSearchParams();
    const value=input.get("name")
 
   
    useEffect(()=>{
  
            searchData();
        
        
    },[value])
 
    let searchData = ()=>{
        axios.get("http://localhost:2000/search?name="+value)
        .then((resp) => setdata(resp.data),console.log("result",data)).catch((error) => { console.log("error") })
        
    }
    

   
    return (
        <div className="tabledata"><h1>Resturents Data</h1>
            <Table striped bordered hover variant="light" responsive>
               
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Ratting</th>
                        <th>Address</th>
                       
                    </tr>
                </thead>
                { data.length>0 ?
                 data.map((item, i) =>
                    <tbody>
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.ratting}</td>
                            <td>{item.address}</td>
                        </tr>
                    </tbody>
                    
                ):<h3>NO DATA FOUND HERE</h3>
                
            }


            </Table>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
export default Search;