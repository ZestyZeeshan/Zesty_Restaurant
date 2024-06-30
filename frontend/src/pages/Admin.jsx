import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Admin=()=>{
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('http://localhost:3000/food')
        .then((response) => {
            setFood(response.data.data)
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    },[])

    return(
      
        <div className="bg-gray-300">

        <Link to="/admin/food/create" className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 font-medium rounded-lg shadow-md">Add Item</Link>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-left">
                    <thead className="uppercase border-gray-100">
                        <tr>
                            <th scope="col" className="py-3 px-5">#</th>
                            <th scope="col"className="py-3 px-5">Name</th>
                            <th scope="col"className="py-3 px-5">Price In Cents</th>
                        </tr>
                    </thead>
                    <tbody>
                        {food.map((food,index) => (
                            <tr key={food._id} className="bg-white hover:bg-gray-400">
                                 <td className="py-3 px-5">{index +1} </td>
                            <td className="py-3 px-5">{food.name} </td>
                            <td className="py-3 px-5">{food.priceInCents} </td>
                            <td className="py-3 px-5">
                                <div className="flex justify-centergap-x-4">
                                    <div className="flex justify-center gap-x-1">
                                        <Link to={`/admin/food/edit/${food._id}`} className="bg-orange-500 hover:bg-orange-900 text-white py-2 px-4 rounded-lg">Edit</Link>
                                        <Link to={`/admin/food/delete/${food._id}`} className="bg-green-500 hover:bg-green-900 text-white py-2 px-4 rounded-lg">Delete</Link>
                                    </div>
                                </div>
                                 </td>
                        </tr>

                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
   
    )
}
export default Admin