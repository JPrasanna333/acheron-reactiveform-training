
export interface IUser {
    email : string; 
    password? : string; 
    address : {
        city : string;
        street: string 
    }
    age? : number; 
}