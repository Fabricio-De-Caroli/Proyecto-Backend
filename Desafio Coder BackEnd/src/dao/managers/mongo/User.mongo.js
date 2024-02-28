import userModel from "../../models/Users.model.js"

export class usersMongo{
    constructor(){
        this.model = userModel
    }
    async get(){
        try {
            return await this.model.find()
        } catch (error) {
            throw new Error(`Hubo un error al obterner los usuarios error: ${error.message}`)
        }
    }
    async post(user){
        try {
            const userCreate = await this.model.create(user);
            return userCreate;
        } catch (error) {
            throw new Error(`Hubo un error al querer guardar un usuario error: ${error.message}`)
        }
    }
    async getById(id){
        try {
            const user = await this.model.findById(id);
            if(!user){
                throw new Error("No se encontro el usuario")
            }
            return user;
        } catch (error) {
            throw new Error(`Hubo un error al querer buscar un usuario error: ${error.message}`)
        }
    }
}