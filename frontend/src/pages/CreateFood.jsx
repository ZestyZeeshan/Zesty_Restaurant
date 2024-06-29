import React,{useState} from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateFood=()=>{
    const [name,setName] = useState('');
    const [priceInCents,setPriceInCents]=useState('');
    
    const[loading,setLoading]=useState(false);
    
    const navigate = useNavigate();
    const{eqnueueSnackbar} = useSnackbar();

    const[img,setImg]=useState(null);
    const [imgPreview,setimgPreview] = useState(null);

    const handleFileChange=(e)=>{
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if(selectedFile){
            const reader = new FileReader();
            reader.onloadend=() =>{
                setimgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile)
        }else{
            setimgPreview(null);
        }

    }

const uploadFile = async () =>{

}

const handleSaveFood = async ()=>{

}

    return(
        <div className="p-6 bg-gray-50 min-h-screen flex justify-center ">
        {loading && <Spinner/>}

        <div className="container max-w-lg shadow-lg rounded-lg p-5 bg-white">
        <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
        <h1 className="text-2xl font-bold text-gray-800 my-4">Create Food</h1>
        <div className="space-y-4">
            <label htmlFor="name" className="block text-lg text-gray-600 mb-2">Name</label>
            <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md "
            required
            />

          <label htmlFor="priceInCents" className="block text-lg text-gray-600 mb-2">Price in cents</label>
            <input
            id="priceInCents"
            type="number"
            value={priceInCents}
            onChange={(e) => setPriceInCents(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
            />

           <label htmlFor="img" className="block text-lg text-gray-600 mb-2">Upload Image</label>
            <input
            id="img"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
            />


            {imgPreview && (
                <div className="my-4">
                    <img src={imgPreview }alt="Preview" className="max-w-full h-auto"/>
                </div>
            )}
            <button onClick={handleSaveFood} className="w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md">Save</button>

        </div>

        </div>
        </div>
    )
}
export default CreateFood;