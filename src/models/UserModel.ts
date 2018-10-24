import {DB} from './DB';


export class User extends DB implements UserInter{

    public id: number;
    public email: string;
    public username: string;
    private password: string;

    //name of table in our DB
    static tableName: string = 'user';

    constructor(email: string,password:string, username:string = null, id:number = null){
        super();
        this.email = email;
        this.password = password;
        this.username = username;
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public async save(){
        return new Promise(resolve=>{
            if(this.id == undefined)
                this.insertNew();
            else
                this.updateExisting();
            resolve(true);
        });
    }

    public async insertNew(){
        var params = [this.username, this.password, this.email];
        return new Promise(resolve=>{
            DB.conn.query(`INSERT INTO ${User.tableName} (username, password, email) VALUES (?,?,?)`,params,(err,rows)=>{
                if(err)
                    throw err;
                resolve(true);
            }); 
        });
    };

    public async updateExisting(){
        var params = [this.username, this.password, this.email, this.id];
        return new Promise(resolve=>{
            DB.conn.query(`UPDATE ${User.tableName} username = ?, password = ?, email = ? WHERE id = ?`,params,(err,rows)=>{
                if(err)
                    throw err;
                resolve(true);
            });
        });
    };

    //static functions

    static async exist(email,password){
        var params = [email, password];
        return new Promise(resolve=>{
            this.conn.query(`SELECT * FROM ${User.tableName} WHERE email = ? AND password = ?;`,params,(err,rows)=>{
                if(err)
                    throw err;

                    console.log("name:"+rows[0].email);
                if(rows.length)
                    resolve( {email:rows[0].email,password:rows[0].password,username:rows[0].username,id:rows[0].id} );
                else
                    resolve(false);
            });
        });
    }


}