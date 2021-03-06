import {client} from "../config/mysql.ts"
import {UsuarioDTO} from "../dto/user_dto.ts"
export class UsuariosModel{
    async listar(){
        const usuarios =  await client.execute('select * from persona');
        return  usuarios.rows;
    }
    async crear(usuarios: UsuarioDTO){
        await client.execute(
            'insert into persona(nombre,apellido,celular,correo,contrasena)values(?,?,?,?,?)',
            [   usuarios.nombre,
                usuarios.apellido,
                usuarios.celular,
                usuarios.correo,
                usuarios.contrasenia]);
    }
    async update(usuarios: UsuarioDTO){
        await client.query(
            'update persona set nombre = ?, apellido = ?, celular = ?,correo = ?, contrasena = ? WHERE idpersona=?',
            [   usuarios.nombre,
                usuarios.apellido,
                usuarios.celular,
                usuarios.correo,
                usuarios.contrasenia,
                usuarios.id,
            ]);
        
    }
    async eliminar(id:number){
        await client.execute(`delete from persona where ?? = ?`, ["idpersona", id]);
    }

}