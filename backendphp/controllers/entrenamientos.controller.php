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
        
        if(!isset($etto->fecha)) {
        http_response_code(400);
        exit(json_encode(["error" => "No se han enviado todos los parametros"]));
        }
        
        $peticion = $this->db->prepare("INSERT INTO entrenamientos (id_usuario,fecha,comentario) VALUES (?,?,?)");
        $resultado = $peticion->execute([IDUSER,$etto->fecha,$etto->comentario]);
        $ultimo_id_etto = $resultado->insert_id();
        
        http_response_code(201);
        exit(json_encode("Entrenamiento creado correctamente"));
    }

}
