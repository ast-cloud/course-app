// Route to view purchased courses IDs
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from "db";
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method=='GET'){
        const session = await getServerSession(req, res, authOptions);
        console.log('In handler - ',JSON.stringify(session));
        if(!session){
            res.status(401).json({'Error':'Unauthenticated'});
            return;
        }
        var user = await User.findOne({email: session['user'].email});
        if(user){
            res.json({purchasedCoursesIds: user.purchasedCourses || []});
            return;
        }
    }
    else{
        res.status(404).json({'Error':'Not found'});
    }

}

