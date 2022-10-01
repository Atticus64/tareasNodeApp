import colors from 'colors';
import inquirer from 'inquirer';

import { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    tareasCheckList,
    editarMenu,
    listadoTareasModificar
} from './helpers/inquirer.js';
import {Tareas} from './models/tareas.js'
import { guardarDB, leerDB } from './db/database.js';

const main = async () => {

    let opt;

    const tareas = new Tareas();

    const tareasDB = leerDB();

    
    if ( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }
    
    do {
        // Imprime el Menu
        opt = await inquirerMenu();

        switch( opt ){
            case 1: 
                // agregar una tarea
                const desc = await leerInput('Descripción:');
                const ok = await confirmar('¿Está seguro de crear la tarea?');
                    if ( ok ){
                        tareas.crearTarea(desc);
                        console.log(`Tarea creada correctamente :D`.green) 
                    } else {
                        console.log(`>> No se creo la tarea`.red);
                    }   
            break;

            case 2: 
                // listar todas las tareas
                tareas.listadoCompletado();
                // console.log( tareas.listadoArr );
            break;

            case 3: 
                // listar tareas completadas
                tareas.listarPendientesCompletadas();
            break;

            case 4: 
                // listar tareas pendientes
                tareas.listarPendientesCompletadas(false)
            break;

            case 5:


                // Menu para editar las tareas
                const opc = await editarMenu();

                const opciones = {
                    1: completarTareas,
                    2: borrarTarea,
                    3: modificarTarea,
                }

                opc === 0 
                    ? '' // no hacemos nada
                    : await opciones[ opc ]( tareas ) // esperamos a que se ejecute la funcion

            break;
        }
        
        guardarDB( tareas.listadoArr );

        await pausa();
        
    } while ( opt !== 0 );



}

const completarTareas = async ( tareas ) => {
    const ids = await tareasCheckList( tareas.listadoArr );
    tareas.toggleCompletadas(ids)

    return tareas;
}

const borrarTarea = async ( tareas ) => {
    const idElim = await listadoTareasBorrar( tareas.listadoArr );
    if ( idElim !== 0 ){
        const ok = await confirmar('¿Está seguro?');
        if ( ok ){
            tareas.borrarTarea(idElim) 
            console.log(`Tarea borrada correctamente :D`.green) 
        } else {
            console.log(`>> No se borro la tarea`.red);
        } 
    } 

    return tareas;
} 

const modificarTarea = async ( tareas ) => {
    const idMod = await listadoTareasModificar( tareas.listadoArr );
    if ( idMod !== 0 ){
        const newDesc = await leerInput('Nueva descripción:');
        const ok = await confirmar('¿Está seguro?');
        if ( ok ){
            tareas.modificarTarea(idMod, newDesc);
            console.log(`Tarea modificada correctamente :D`.green) 
        } else {
            console.log(`>> No se borro la tarea`.red);
        } 
    } 

    return tareas;
}


main();

