import { EjercicioEtto } from "./ejercicio";

export interface Entrenamiento {
    id?: number,
    id_usuario?: number,
    fecha: string,
    comentario?: string,
    pesoCorporal?: number,
    ejercicios: EjercicioEtto[]
}
