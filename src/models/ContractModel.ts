import {DB} from './DB';

export class Contract extends DB{

    public id: number;
    public title: string;
    public company: string;
    public price_year: number;
    public user_id: number;

    //name of table in our DB
    static tableName: string = 'contract';

    constructor(title: string, company:string, price_year:number, id:number = null){
        super();
        this.title = title;
        this.company = company;
        this.price_year = price_year;
        this.id = id;

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
        var params = [this.title, this.company, this.price_year,];
        return new Promise(resolve=>{
            DB.conn.query(`INSERT INTO ${Contract.tableName} (title, company, price_year, user_id) VALUES (?,?,?,?)`,params,(err,rows)=>{
                if(err)
                    throw err;
                
                resolve(true);
            }); 
        });
    };

    public async updateExisting(){
        var params = [this.title, this.company, this.price_year, this.id];
        return new Promise(resolve=>{
            DB.conn.query(`UPDATE ${Contract.tableName} title = ?, company = ?, price_year = ? WHERE id = ?`,params,(err,rows)=>{
                if(err)
                    throw err;
                resolve(true);
            });
        });
    };

    //static functions

    static async takeAll(user){
        var params = [user.id];
        var result = [];
        return new Promise(resolve=>{
            DB.conn.query(`SELECT * FROM ${this.tableName} WHERE user_id = ?`,params,(err,rows) => {
                if(err)
                    throw err;
                if(rows.length){
                    for(let row of rows){
                        result.push(new Contract(row.title,row.company_name,row.price_year,row.id));
                    }
                }
                resolve(result);
            })
        });
    }
}