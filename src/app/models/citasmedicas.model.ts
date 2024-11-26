export interface Item{
    name: string,
    completed: boolean,
}
export interface appointment {
    id: string; // o number, según el tipo que estés utilizando
    fecha: string;
    hora: string;
    usuarioId: number;
    titulo: string; // Asegúrate de que todas las propiedades necesarias estén aquí
    descripcion: string;
    hospital: string;
    especialidad: string;
    items: any[]; // Si necesitas la propiedad 'items', agrégala aquí
  }
  