import { error } from 'console';
import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGOURI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=> {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', ()=> {
            console.log('There is an error running')
        })
    }catch {
        console.log('Something went wrong!')
        console.log(error)
    }
}