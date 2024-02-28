export class createUserDto{
    constructor(user){
        this.fullName = `${user.name} ${user.lastname}`;
        this.name = user.first_name;
        this.lastname = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.id = user.cartId;
        this.rol = user.rol
    }
}

export class getUserDto{
    constructor(userDB){
        this.fullName = userDB.fullName;
        this.email = userDB.email
        this.age = userDB.age
    }
}