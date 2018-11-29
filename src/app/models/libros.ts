export class Libro{
    constructor(
        public _id: String,
        public descripcion:String,
        public autor: String,
        public editorial:String,
        public edicion:String,
        public fecha_pub:String,//date
        public existencia:number,
        public disponibles:number,
        public categoria: String,
        public imagen: String,
        public precio:Number,
        public estatus:String,
        public dias_prestamos:Number
    ){}
}