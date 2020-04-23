const modelo=require('../models/inscripcionesModel');

const getAllInscripciones=async function (req,res){
  let respuesta=await modelo.getAllInscripciones();
  await res.status(200).json(respuesta);
}
const getEstudianteCurso= async function(req,res){
  let respuesta=await modelo.getEstudianteCurso(req.params);
  if(respuesta){
    res.status(200).send(respuesta);
  }else{
    res.status(404).send();
  }
}


const createInscripciones=function(req,res){
  res.send('Inscribiendo al estudiante');
  res.send(modelo.add(req));
  res.send('Se inscribio al estudiante');
}

const deleteInscripciones=function (req,res){
  res.send('Dando de baja alumno en el curso '+req.params.id);
  if(modelo.erase(req)){
    res.send('Se le dio de baja');
  }else{
    res.status(500).json({error:`No se pudo dar de baja: ${req.params.id}` })
  }
};
exports.getAllInscripciones=getAllInscripciones;
exports.getEstudianteCurso=getEstudianteCurso;
exports.createInscripciones=createInscripciones;
exports.deleteInscripciones=deleteInscripciones;
