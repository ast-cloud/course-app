// Route to view all published courses
import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from "db";
import { ensureDBConnected } from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method=='GET'){
        try{
            await ensureDBConnected();
            var a = await Course.find({published: true});   
            res.status(200).json({courses: a});
        }catch(error){
            res.status(500);
        }
    }

}

