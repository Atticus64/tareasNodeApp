const { v4: uuidv4 } = require('uuid')


class Tarea {

    id = ''
    desc = ''
    completadoEn = null

    constructor( desc ) {

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null

    }

    cargarTareaArr( arr ) {

    }


}




module.exports = Tarea;