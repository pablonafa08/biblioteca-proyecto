export class Prestamo{
    constructor(
        public _id: String,
        public libro:String,
        public usuario:String,
        public bibliotecario:String,
        public fecha: String,
        public fecha_entrega_A:String,
        public estatus:String,
        public comentarios_prestamo:String,
        public fecha_entrega_R:String,
        public entrega_tiempo: String, //status (true, false)
        public entrega_danio: String, //↑
        public dias_retraso: Number,
        public porcentaje: Number,
        public cobro_retraso: number
        
    ){

    }
}