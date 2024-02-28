import {v4 as uuidv4} from "uuid"

export class userMemory{
    constructor(){
        this.users = []
    }
    get(){
        return this.users
    };
    post(user){
        user.id= uuidv4();
        this.users.push(user);
    };
    async getById(id){
        const user = this.users.find(u=>u.id === id);
        if(!user){
            throw new Error("No se encontro el usuario")
        }
        return user;
    };
}