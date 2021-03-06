import {client} from "./config/mysql.ts"
import {UsuariosModel} from "./models/user.ts"
import {UsuarioController} from "./controlers/usuarioControllers.ts"
const usuarioModel = new UsuariosModel();
const usuarioControler = new UsuarioController();
 export const  validarDatos = () => {
    let estadoNombre = true;
    let estadoApellido= true;
    let estadoCorreo = true;
    let nombre
    let apellido
    let celular
    let correo
    let contrasena
    while (estadoNombre==true) {
    nombre = prompt('Ingrese su Nombre: ') as string;
    if(nombre.length >3){
      estadoNombre = false;
    } else {
      console.log("el nombre es muy corto debe ser mayor a 3 letras");
    }
    }
    while (estadoApellido==true) {
    apellido = prompt('Ingrese su Apellido: ') as string;
    if(apellido.length >3){
      estadoApellido = false;
    } else {
      console.log("el apellido es muy corto debe ser mayor a 3 letras");
    }
    }
  celular = prompt('Ingrese su numero de celular:   ') as string;
  
    while (celular!==null) {
    if (celular.length !==10){
      console.log("Debe ser un celular verdadero de 10 digitos")
      celular = prompt('Ingrese su numero de celular:   ') as string;
    }else{
      break
    }
    }
    let exprecionRegular = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    while (estadoCorreo==true) {
    correo = prompt('Ingrese su correo electronico') as string;
    if (exprecionRegular.test(correo)){
      estadoCorreo = false;
    }else{
      console.log("el correo no es valido");
    }
    }
  
  //let expRgpassworks= /^(?=(?:.*\d))(?=(?:.*[A-Z]){1})(?=(?:.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]){1})\S{8}$/;
    let expRgpassworks= /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/;
    let estadopassword= true;
  
    while (estadopassword==true) {
    contrasena = prompt('Ingrese su contraseña') as string;
    if(expRgpassworks.test(contrasena)){
      console.log("correcta")
      estadopassword = false;
    }else{
      console.log("no cumple")
    }
    }
    return [nombre,apellido,celular,correo,contrasena];
  }
  
  let option;
  let userId;
  // do {
  //   do {
  //     console.log("------------------------------------------------------------");
  //     console.log("################### REGISTROS DE USUARIOS ##################");
  //     console.log("                   1.Listar  Usuarios");
  //     console.log("                   2.Crear  Usuarios");
  //     console.log("                   3.Actualizar Usuarios");
  //     console.log("                   4.Eliminar Usuarios");
  //     console.log("                   5.Salir()");
  //     console.log("------------------------------------------------------------");
  //     option = parseInt(prompt("selecione una opción") as string);
      
  //     if (option ==1) {

  //       const usuarios = await client.execute('select * from persona');
  //       console.log(usuarios.rows);
  //     }else if (option ==2){

  //       const [nombre, apellido,celular,correo,contrasena] = validarDatos();
  //       await client.execute(
  //         'insert into persona(nombre,apellido,celular,correo,contrasena)values(?,?,?,?,?)',
  //         [nombre,apellido,celular,correo,contrasena]);
  //       console.log("usuario guardado correctamente");
  //     }else if (option ==3){
    
  //       const usuarios = await client.execute('select * from persona');
  //       console.log(usuarios.rows);
  //       userId =parseInt(prompt("selecione el usuario ha Actualizar: ") as string);
  //       const [nombre, apellido,celular,correo,contrasena] = validarDatos();
  //       let result = await client.query(
  //       'update persona set nombre = ?, apellido = ?, celular = ?,correo = ?, contrasena = ? WHERE idpersona=?',
  //       [nombre,apellido,celular,correo,contrasena,userId]);
  //       console.log(result);
    
  //     }else if (option ==4){
    
  //       const usuarios = await client.execute('select * from persona');
  //       console.log(usuarios.rows);
  //       userId =parseInt(prompt("selecione el usuario ha eliminar: ") as string);
  //       await client.execute(`delete from persona where ?? = ?`, ["idpersona", userId]);
  //       console.log("el usario ha sido eliminado");
  //     }
  //   }while (option>5);
  //   console.log( "termina proceso")
  //   //await client.close();
  // }while (option!=5);

  let salir = true

  while (salir!=false) {
    console.log("------------------------------------------------------------");
       console.log("################### REGISTROS DE USUARIOS ##################");
       console.log("                   1.Listar  Usuarios");
       console.log("                   2.Crear  Usuarios");
       console.log("                   3.Actualizar Usuarios");
       console.log("                   4.Eliminar Usuarios");
       console.log("                   5.Salir()");
       console.log("------------------------------------------------------------");
       option = prompt("selecione una opción") as string;
    switch (option) {
      case "1":{
        await usuarioControler.listar()
          break;
      }
      case "2":{
        await usuarioControler.crear()
          break;
      }
      case "3":{
        const usuarios = await usuarioModel.listar();
        console.log(usuarios);
        userId =parseInt(prompt("selecione el usuario ha Actualizar: ") as string);
        await usuarioControler.update(userId)
          break;
      }
      case "4":{
         const usuarios = await usuarioModel.listar();
         console.log(usuarios);
         userId =parseInt(prompt("selecione el usuario ha eliminar: ") as string);
        //  await client.execute(`delete from persona where ?? = ?`, ["idpersona", userId]);
        //  console.log("el usario ha sido eliminado");
        await usuarioControler.eliminarId(userId)
          break;
      }
      case "5":{
          salir=false;
          console.log("proceso terminado");
          break;
      }
      default: {
          console.log("valor fuera de rango, vuelva a elegir");
          break;
      }
    }
  }

