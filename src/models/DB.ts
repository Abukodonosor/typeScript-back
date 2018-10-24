import * as mysql from 'mysql';
import {config} from '../configDB';

export class DB{

    public static conn:mysql.Connection;

    public static init(): void{
        this.conn = mysql.createConnection(config);
        this.conn.connect();
    }

    public static close():void{
        this.conn.end(err => {});
    }
}
