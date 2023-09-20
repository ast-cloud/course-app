import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next';


export function adminAuth(req: NextApiRequest){
    var authHeader = req.headers.authorization;
    var authResult = false;
    console.log('authHeader --------------- ', authHeader)
    if(authHeader){
        var t = authHeader.split(' ')[1];
        jwt.verify(t, process.env.JWT_SECRET as string, function(err, decodedPayload){
            if(err){
                console.log('Returnnnnnnnnnnnnnnnnnnn 1')
                authResult = false;
            }
            else if(!decodedPayload){
                console.log('Returnnnnnnnnnnnnnnnnnnn 2')
                authResult = false;
            }
            else if(typeof decodedPayload == 'string'){
                console.log('Returnnnnnnnnnnnnnnnnnnn 3')
                authResult = false;
            }
            else if(decodedPayload.role == 'admin'){
                console.log('Returnnnnnnnnnnnnnnnnnnn 4')
                authResult = true;
            }
            else{
                console.log('Returnnnnnnnnnnnnnnnnnnn 5')
                authResult = false;
            }

        });
    }
    else{
        console.log('Returnnnnnnnnnnnnnnnnnnn 6')
        authResult = false;
    }
    return authResult;
}