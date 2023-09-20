// Route to purchase a course
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User, Course } from "db";
import { ensureDBConnected } from '@/lib/dbConnect';


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const courseId = req.query.courseId;

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
            var course = await Course.findById(courseId);
            if(!course){
                res.status(404).json({'Error':'Course not found'});
            }
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message: 'Course purchased successfully'});
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