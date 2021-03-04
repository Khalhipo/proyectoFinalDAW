export interface EjercicioLista {
    id: number,
    nombre: string,
    categoria: string,
    descripcion?: string
}

export interface EjercicioEtto {
    id?: number,
    id_entrenamiento?: number,
    id_ejercicio: number,
    series: number,
    repeticiones: number,
    peso: number
}

export interface EjercicioMostrar {
    id_ejercicio: number,
    nombre?: string,
    categoria: string,
    series: number,
    repeticiones: number,
    peso: number
}
