import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from "db";
import { ensureDBConnected } from '@/lib/dbConnect';

export async function checkCreds(email: string, password: string){

    if(email && password){
        try{
            await ensureDBConnected();
            var a = await User.findOne({email: email});   
            if(a){
                if(a.password == password){
                    return a;
                }
                else{
                    return null;
                }
            }
            else{
                console.log('About to create new userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                var newUser = new User({email: email, password: password, name: '', image:''});
                await newUser.save();
                return {'email': email, 'password': password, name: '', image: ''};
            }
        }catch(error){
            return null;
        }
    }
    else{
        return null;
    }
    

}