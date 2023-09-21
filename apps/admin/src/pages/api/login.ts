// Route to login
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method=='POST'){
        if(req.headers.username && req.headers.password){
            if(req.headers.username==process.env.ADMIN_USERNAME && req.headers.password==process.env.ADMIN_PASSWORD){
                var token = jwt.sign({username:req.body.username, role: 'admin'}, process.env.JWT_SECRET as string, {expiresIn:'1h'});
                res.status(200).json({ message: 'Admin logged in successfully', token: token });
            }
            else{
                res.status(401).json({'Error':'Invalid credentials'});
            }
        }
        else{
            res.status(400).send('Insufficient parameters supplied.');
        }
    }
    else{
        res.status(400).send('Incorrect method');
    }

}

