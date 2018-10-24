import {DB} from './DB';


export class Users extends DB{

    public id: number;
    public email: string;
    public username: string;
    private password: string;

    constructor(email: string,password:string, username:string){
        super();
        this.email = email;
        this.password = password;
        this.username = username;

    }

    static save(){
        return new Promise(resolve=>{
            
            this.conn.query("SELECT * FROM user",[],(err,rows)=>{
                resolve(rows);
            });
        });
    }

}