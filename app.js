require('colors')
const inquirer = require('inquirer');

const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    tareasCheckList,
    editarMenu,
    listadoTareasModificar
} = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./db/database')

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
                switch( opc ) {
                    // salir
                    case 0: ''
                    break;
                    // Completar tareas
                    case 1: 
                        const ids =  await tareasCheckList( tareas.listadoArr );
                        tareas.toggleCompletadas(ids)
                    break;
                    // Borrar tarea
                    case 2: 
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
                    break;
                    // Modificar Tarea
                    case 3: 
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
                    break;
                }
                
            break;
        }
        
        guardarDB( tareas.listadoArr );

        await pausa();
        
    } while ( opt !== 0 );



}

main();

