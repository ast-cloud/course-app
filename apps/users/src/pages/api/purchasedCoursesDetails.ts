// Route to get details of purchased courses
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { ensureDBConnected } from '@/lib/dbConnect';
import { User, Course } from "db";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method=='GET'){
        try{
            const session = await getServerSession(req, res, authOptions);
            if(!session){
                res.status(401).json({'Error':'Unauthenticated'});
                return;
            }
            await ensureDBConnected();
            var user = await User.findOne({email: session['user'].email});
            if(!user){
                res.status(404).json({'Error':'User not found'});
                return;
            }
            var purchasedCoursesDetails = await Course.find({_id:{$in: user.purchasedCourses}});
            res.json({purchasedCoursesDetails: purchasedCoursesDetails});
            return;
        }catch(error){
            res.status(500).send('Internal server error');
        }
    }

}