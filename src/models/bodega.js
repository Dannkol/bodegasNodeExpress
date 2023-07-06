import mysql from "mysql2/promise";
import dbConfig from "../config/dbconfig.js";

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};


/* crea una nueva bodega */
const createBodega = async (nombre, id_responsable, estado) => {
    const connection = await getConnection();

    try {


        const [result] = await connection.query(
            `INSERT INTO bodegas (nombre, id_responsable, estado) VALUES ("${nombre}", ${id_responsable} , ${estado})`
        );


        const bodegaId = result.insertId;



        const [bodega] = await connection.query(
            `SELECT * FROM bodegas WHERE id = ${bodegaId}`
        );

        console.log(result);
        console.log(bodega[0].nombre);

        return bodega[0];
    } catch (error) {
        throw error;
    } finally {
        connection.end();
    }
};


const listarproductos = async () => {

    const connection = await getConnection();

    try {


        const produco = await connection.query( /* SQL */
            ` SELECT t2.nombre AS "bodega" , SUM(t1.cantidad) AS "total", t1.id_producto AS "producto" FROM inventarios AS t1 
        INNER JOIN bodegas AS t2 ON t2.id = t1.id_bodega
        GROUP BY t2.nombre, t1.id_producto
        ORDER BY total DESC`);



        return produco[0];
    } catch (error) {
        throw error;
    } finally {
        connection.end();
    }


}


export default { createBodega, listarproductos };