// Route to view details of a particular course
import type { NextApiRequest, NextApiResponse } from 'next';
import { ensureDBConnected } from '@/lib/dbConnect';
import { Course } from "db";



export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const courseId = req.query.courseId;

    if(req.method=='GET'){
        try{
            await ensureDBConnected();
            var course = await Course.findById(courseId);
            if(!course){
                res.status(404).json({'Error':'Course not found'});
                return;
            }
            if(course.published==false){
                res.status(400).json({'Error':'Course not published'});
                return;
            }
            res.json({course: course});
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