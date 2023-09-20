// Route to view all published and unpublished courses
import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from "db";
import { ensureDBConnected } from '@/lib/dbConnect';
import { adminAuth } from '@/lib/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    var r = adminAuth(req);
    if(!r){
        res.status(401).json({'Error':'Unauthenticated'});
        return;
    }
    if(req.method=='GET'){
        try{
            await ensureDBConnected();
            var a = await Course.find({});   
            res.status(200).json({courses: a});
        }catch(error){
            res.status(500);
        }
    }

}

