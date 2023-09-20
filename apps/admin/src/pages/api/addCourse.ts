// Route to add a new course
import type { NextApiRequest, NextApiResponse } from 'next';
import { ensureDBConnected } from '@/lib/dbConnect';
import { Course } from "db";
import { adminAuth } from '@/lib/adminAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    var r = adminAuth(req);
    if(!r){
        res.status(401).json({'Error':'Unauthenticated'});
        return;
    }

    if(req.method=='POST'){
        try{
            await ensureDBConnected();
            var newCourse = req.body;
            const requiredFields = ['title', 'description', 'author', 'price', 'discountedPrice', 'imageLink', 'published', 'featured'];
            const allFieldsExist = requiredFields.every((field)=>{return field in newCourse});
            if(allFieldsExist){
                var a = new Course(newCourse);
                await a.save();
                res.status(200).json({message:'Course created successfully', courseId: a.id});
            }
            else{
                res.status(400).send({'Bad request':'Insufficient parameters supplied'});
            }

            return;

        }catch(error){
            console.log('Error - ', error);
            res.status(500).send('Internal server error');
        }
    }
    else{
        res.status(404).json({'Error':'Not found'});
        return;
    }


}