// Route to edit the details of a particular course
import type { NextApiRequest, NextApiResponse } from 'next';
import { ensureDBConnected } from '@/lib/dbConnect';
import { Course } from "db";
import { adminAuth } from '@/lib/adminAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const courseId = req.query.courseId;

    var r = adminAuth(req);
    if(!r){
        res.status(401).json({'Error':'Unauthenticated'});
        return;
    }

    if(req.method=='PUT'){
        try{
            await ensureDBConnected();
            var a = await Course.findByIdAndUpdate(courseId, req.body, {new: true});
            if(a){
                res.json({ message: 'Course updated successfully' });
            }
            else{
                res.status(401).json({ message: 'Course not found' });
            }
            
            return;
        }catch(error){
            res.status(500).send('Internal server error');
        }
    }
    else{
        res.status(404).json({'Error':'Not found'});
        return;
    }


}