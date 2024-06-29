import React,{useState} from "react";
import axios from 'axios';
import {useSnackbar} from 'notistack';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const DeleteFood=()=>{

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    

    const handleDeleteFood = ()=>{
        setLoading(true);

        axios.delete(`http://localhost:3000/food/${id}`)
        .then(()=>{
            setLoading(false);
            enqueueSnackbar('Food Deleted',{variant:'success'} );
        })
        .catch((error)=>{
            setLoading(false);
            enqueueSnackbar('Error',{variant:'error'});
            console.log(error);
        })
    } 


    return(
        <div className="p-6 bg-gray-50 flex justify-center items-center">
            {loading && <Spinner/>}
        <div className="container max-w-lg shadow-lg p-5">
            <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
            <h2 className="text-2xl mb-4 font-semibold text-gray-800">Are You Sure You Want to Delete this Food item?</h2>
            <button onClick={handleDeleteFood} className="bg-red-500 hover:bg-red-950 text-white py-2 px-4 rounded-lg w-full">Yes,Delete

            </button>

        </div>
        </div>
    )
}
export default DeleteFood;