<?php

class EntrenamientosController {

    private $db = null;

    function __construct($conexion) {
        $this->db = $conexion;
    }

    public function listarEjercicios() {
        $eval = "SELECT * FROM ejercicios";
        $peticion = $this->db->prepare($eval);
        $peticion->execute();
        $resultado = $peticion->fetchAll(PDO::FETCH_OBJ);
        exit(json_encode($resultado));
    }

    public function crearEtto() {
        $etto = json_decode(file_get_contents("php://input"));

        if (!isset($etto->fecha)) {
            http_response_code(400);
            exit(json_encode(["error" => "No se han enviado todos los parametros"]));
        }

        $eval = "INSERT INTO entrenamientos (id_usuario,fecha,comentario) VALUES (?,?,?)";
        $peticion = $this->db->prepare($eval);
        $resultado = $peticion->execute([IDUSER, $etto->fecha, $etto->comentario]);

        $ultimo_id_etto = $this->db->lastInsertId();

        foreach ($etto->ejercicios as $ejercicio) {
            $eval = "INSERT INTO etto_ejercicios (id_entrenamiento,id_ejercicio,series,repeticiones,peso) VALUES (?,?,?,?,?)";
            $peticion = $this->db->prepare($eval);
            $resultado = $peticion->execute([$ultimo_id_etto, $ejercicio->id_ejercicio, $ejercicio->series, $ejercicio->repeticiones,
                $ejercicio->peso]);
        }

        $eval = "INSERT INTO pesos (id_usuario,fecha,peso) VALUES (?,?,?)";
        $peticion = $this->db->prepare($eval);
        $resultado = $peticion->execute([IDUSER, $etto->fecha, $etto->pesoCorporal]);

        http_response_code(201);
        exit(json_encode("Entrenamiento creado correctamente"));
    }

    public function recuperarEtto() {
        $fecha = null;
        $fecha = $_GET['fecha'];

        if (!isset($fecha)) {
            http_response_code(400);
            exit(json_encode(["error" => "No se han enviado todos los parametros"]));
        }

        $eval = "SELECT * FROM entrenamientos WHERE id_usuario = ? AND fecha = ?";
        $peticion = $this->db->prepare($eval);
        $peticion->execute([IDUSER, $fecha]);

        $datosEtto = $peticion->fetchAll();
        if ($datosEtto) {

            $etto['id'] = $datosEtto[0]['id'];
            $etto['comentario'] = $datosEtto[0]['comentario'];

            $eval = "SELECT peso FROM pesos WHERE id_usuario = ? AND fecha = ?";
            $peticion = $this->db->prepare($eval);
            $peticion->execute([IDUSER, $fecha]);
            $etto['pesoCorporal'] = $peticion->fetchAll()[0]['peso'];

            $eval = "SELECT * FROM ejerciciosmostrar WHERE id_entrenamiento = ?";
            $peticion = $this->db->prepare($eval);
            $peticion->execute([$etto['id']]);
            $etto['ejercicios'] = $peticion->fetchAll();

            exit(json_encode($etto));
        } else {
            exit(json_encode(["respuesta" => "error"]));
        }
    }

    public function borrarEtto() {
        $fecha = null;
        $fecha = $_GET['fecha'];
        $id_entrenamiento = null;

        if (!isset($fecha)) {
            http_response_code(400);
            exit(json_encode(["error" => "No se han enviado todos los parametros"]));
        }

        $eval = "SELECT id FROM entrenamientos WHERE id_usuario = ? AND fecha = ?";
        $peticion = $this->db->prepare($eval);
        $peticion->execute([IDUSER, $fecha]);
        $etto = $peticion->fetch(PDO::FETCH_ASSOC);
        $id_entrenamiento = $etto['id'];

        $eval = "DELETE FROM entrenamientos WHERE id_usuario = ? AND fecha = ?";
        $peticion = $this->db->prepare($eval);
        $peticion->execute([IDUSER, $fecha]);
        http_response_code(200);
        if ($peticion->rowCount()) {

            $eval = "DELETE FROM pesos WHERE id_usuario = ? AND fecha = ?";
            $peticion = $this->db->prepare($eval);
            $peticion->execute([IDUSER, $fecha]);

            $eval = "DELETE FROM etto_ejercicios WHERE id_entrenamiento = ?";
            $peticion = $this->db->prepare($eval);
            $peticion->execute([$id_entrenamiento]);

            exit(json_encode("Entrenamiento eliminado correctamente"));
        } else
            exit(json_encode("No se ha eliminado el entrenamiento"));
    }

}
