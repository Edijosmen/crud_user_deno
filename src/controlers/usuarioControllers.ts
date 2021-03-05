import {UsuariosModel} from "../models/user.ts"
const usuarioModel = new UsuariosModel()
export class UsuarioController{
   async listar(){
        const usuarios = await usuarioModel.listar();
        console.log(usuarios);
    }
}