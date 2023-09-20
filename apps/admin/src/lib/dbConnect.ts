import mongoose from 'mongoose';

var alreadyDone = false;  //The variable's value will persist across multiple imports because it's declared outside the function and module-level variables are shared across all imports of the module.

export async function ensureDBConnected(){
    if(alreadyDone)
        return;
    alreadyDone=true;
    await mongoose.connect(process.env.MONGO_URL as string);
}