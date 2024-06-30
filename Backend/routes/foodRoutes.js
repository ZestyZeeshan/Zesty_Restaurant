import express from 'express';
import {Food} from "../models/foodModels.js";
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',auth, async (request,response)=>{
    try{
        if(
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.image
        ){
            return response.status(400).send({
            message:'Required Fields are Missing'
        })        
         }

    const newFood = {
        name : request.body.name,
        priceInCents:request.body.priceInCents,
        image: request.body.image
    };
    const food = await Food.create(newFood);

    return response.status(201).send(food);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});

    }
});

//getting all food item

router.get('/',async (request,response) => {
    try{
        const food= await Food.find({});

        return response.status(200).json({
            data:food
        })

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//deleting specific food item
router.delete('/:id',auth, async(request,response)=>{
    try{
        const { id } =request.params;
        const result = await Food.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message : 'Item not found'});
        }
        
        response.status(200).json({message:'Item Successfully deleted', deletedItem:result})

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

//Updating A food item
router.put('/:id',auth, async (request,response)=>{
    try{
        if(
            !request.body.name ||
            !request.body.priceInCents 
        ){
            return response.status(400).send({
                message:'Required Fields are Missing'
            }) 
        }

        const { id } =request.params;
        const result = await Food.findByIdAndUpdate(id, request.body,{
            new: true
            //it will update the data in the databse
        });
        if(!result){
            return response.status(404).json({ message: 'food not found'});
        }

        return response.status(200).send({message:'Food Updated'})
    } catch (error){

        console.log(error.message);
        response.status(500).send({ message: error.message});
    }

})

//getting a specific food item
router.get('/:id', async(request,response)=>{
    try{
        const { id } =request.params;
        const food = await Food.findById(id);
        
        return response.status(200).json(food);

        }catch{
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})




export default router;


// import express from 'express';
// import { Food } from '../models/foodModels.js'; // Make sure the path is correct

// const router = express.Router();

// router.post('/', async (request, response) => {
//   try {
//     const { name, priceInCents, image } = request.body;

//     if (!name || !priceInCents || !image) {
//       return response.status(400).send({
//         message: 'Required Fields are Missing'
//       });
//     }

//     const newFood = { name, priceInCents, image };
//     const food = await Food.create(newFood);

//     return response.status(201).send(food);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// export default router;
