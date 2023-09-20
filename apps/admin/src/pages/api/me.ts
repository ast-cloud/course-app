// Route to check login state
import type { NextApiRequest, NextApiResponse } from 'next';
import {adminAuth} from '@/lib/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    var r = adminAuth(req);
    if(r){
        res.status(200).send('Logged in as admin');
    }
    else{
        res.status(401).json({message:'Unauthorized'});
    }
}
