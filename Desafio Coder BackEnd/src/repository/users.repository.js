import { createUserDto, getUserDto } from "../dao/DTO/users.Dto.js";

export class userRepository{
    constructor(dao){
        this.dao = dao
    }
    async getUsers(){
        const user = await this.dao.get();
        return user;
    }
    async createUser(user){
        const userDto = new createUserDto(user);
        const userCreated = await this.dao.post(userDto);
        const userDtoFront = new getUserDto(userCreated);
        return userDtoFront;
    }
}