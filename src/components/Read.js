import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tabledark , setTableDark] = useState('');

    useEffect(() => {
        axios.get('https://64b3ae240efb99d8626841ba.mockapi.io/osama/crud/crud-osama')
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false)
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://64b3ae240efb99d8626841ba.mockapi.io/osama/crud/crud-osama/${id}`)
            .then(() => {
                setData(prevData => prevData.filter(item => item.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
            });
    };

    const setToLocalStorage = (id, name, email) => {
        localStorage.setItem("id", id)
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
    };

    return loading ? (
        <img
            src='https://media0.giphy.com/media/y1ZBcOGOOtlpC/200w.webp?cid=ecf05e47jleb2o2v2hnwjala0s6anuk6ejt7kovcqm6fwrdo&ep=v1_gifs_related&rid=200w.webp&ct=g'
            alt="mak"
        />
    ) : error ? (<h5> SomeThing Went Wrong</h5>) : (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" 
                onClick={()=>{
                  if(tabledark === 'table-dark') setTableDark('');
                  else setTableDark('table-dark');
                }} />
            </div>
            <div className='d-flex justify-content-between m-2'>
                <h2>Read Operation</h2>
                <Link to='/'>
                    <button className='btn btn-primary'>Create Data</button>
                </Link>
            </div>
            <table className={`table ${tabledark}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((post) => (
                            <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.name}</td>
                                <td>{post.email}</td>
                                <td>
                                    <Link to='/update'>
                                        <button className='btn btn-success' onClick={() => setToLocalStorage(post.id, post.name, post.email)}>Edit</button>
                                    </Link>
                                </td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(post.id)}>Delete</button></td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </>
    )
}

export default Read