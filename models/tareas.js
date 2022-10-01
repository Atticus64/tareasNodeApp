import {Tarea} from '../models/tarea.js';

/* 
_listado:
    { 
        uuid-837492843423jsf: { id: 32, desc: "algo...", completadoEn: 2432421  } 
    }
*/

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        // Object.keys(this._listado).forEach( key =>  {
        //     const tarea = this._listado[key];
        //     listado.push(tarea)
        // });
        Object.keys(this._listado).map( k =>  listado.push(this._listado[k]));

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    modificarTarea( id,  desc ){
        if ( this._listado[id] ){
            this._listado[id].desc = desc;
        }
    }

    cargarTareasFromArray( tareas = []) {
        
        tareas.map( tarea => this._listado[tarea.id] = tarea );

        // tareas.forEach( tarea => {
            // this._listado[tarea.id] = tarea;
        // })
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; 

    }

    listadoCompletado() {

        // Competada: verde 
        // Pendiente: rojo
        // 1. Aprender js :: Pendiente  
        // tareas.fo
        console.log();
        this.listadoArr.forEach( (tarea, index) =>  {
            let mesg = '';
            tarea.completadoEn === null 
                ? mesg = `${ (index + 1 + '.').cyan } ${ tarea.desc } :: ${ 'Pendiente'.red }`
                : mesg = `${ (index + 1 + '.').cyan } ${ tarea.desc } :: ${ 'Completado'.green }`
            
            console.log(mesg);
        })

        console.log();
    }


    listarPendientesCompletadas ( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea) =>  {
            if ( completadas ) {
                if ( tarea.completadoEn ){
                    contador++
                    console.log(`${ ( contador + '.').cyan } ${ tarea.desc } :: ${ tarea.completadoEn.yellow }`);
                }
            } else {
                if ( tarea.completadoEn === null ){
                    contador++
                    console.log(`${ ( contador + '.').cyan } ${ tarea.desc } :: ${ 'Pendiente'.red }`);
                }
            }
        });
        console.log();
    }

    toggleCompletadas( ids = [] ) {
        // ids.forEach( id =>  {
        //     const tarea = this._listado[id];
        //     if ( !tarea.completadoEn) {
        //         tarea.completadoEn = new Date().toISOString();
        //     } 
        // });

        // this.listadoArr.filter
        ids.map( id =>  {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            } 
        })

        this.listadoArr.map( tarea =>  {

            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }


        });


    }

}



export {
    Tareas
}
