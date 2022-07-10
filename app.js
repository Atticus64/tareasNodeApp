require('colors')

const inquirer = require('inquirer');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    tareasCheckList
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
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
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
                // completado o pendiente checkboxes
                const ids =  await tareasCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids)
            break;
            case 6: 
                
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== 0 ){
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ){
                        tareas.borrarTarea(id) 
                        console.log(`Tarea borrada correctamente :D`.green) 
                    } else {
                        console.log(`>> No se borro la tarea`.red);
                    }   

                } 


            break;
        }
        
        guardarDB( tareas.listadoArr );

        await pausa();
        
    } while ( opt !== 0 );



}



main();

