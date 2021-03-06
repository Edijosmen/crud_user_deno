import {UsuariosModel} from "../models/user.ts"
import {validarDatos} from "../app.ts"
const usuarioModel = new UsuariosModel()
export class UsuarioController{
   async listar(){
        const usuarios = await usuarioModel.listar();
        console.log(usuarios);
    }

    async crear(){
        const [nombre,apellido,celular,correo,contrasena] = validarDatos();
        await usuarioModel.crear({
          nombre: nombre!,
          apellido: apellido!,
          celular: celular!,
          correo: correo!,
          contrasenia: contrasena!,
          id: 1,
        });
       console.log("usuario guardado correctamente");
    }
    async update(id:number){
        const [nombre,apellido,celular,correo,contrasena] = validarDatos();
        await usuarioModel.update({
            nombre: nombre!,
            apellido: apellido!,
            celular: celular!,
            correo: correo!,
            contrasenia: contrasena!,
            id: id,
        })

    }
    async eliminarId(id:number){
        await usuarioModel.eliminar(id)
    }
}