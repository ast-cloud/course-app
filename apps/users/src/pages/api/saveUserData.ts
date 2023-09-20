import {User} from 'db';
import { ensureDBConnected } from '@/lib/dbConnect';

export async function saveUserData(email: string, name: string){

    try{

        await ensureDBConnected();
        
        var user = await User.findOne({email: email});
    
        if(user){
            if(name){
                user.name = name;
            }
            await user.save();            
        }
        else{
            var newUser = new User({email: email, name: name});
            await newUser.save();
            console.log('New user inserted in database:', newUser);
        }

        return true;

    }catch(error){
        console.log('error caught - ',JSON.stringify(error));
        return false;
    }

    
}