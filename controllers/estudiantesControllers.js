const modelo=require('../models/estudiantesModel');
let datos;
const getAllEstudiantes=function(req,res){
  if(req.query.matricula){
    return res.status(200).json(modelo.findByMatricula(req.query.matricula));
  }
  res.status(200).json(modelo.findAll());
}
const getEstudiante=function(req,res){
  datos=modelo.findByMatricula(req.params.matricula,res);
  if(datos){
    console.log(datos);
    res.status(200).json(datos);
  }else{
    res.status(404).json({error:'No se encontro'});
  }
}
const createEstudiante=function(req,res){
  res.send('Creando un nuevo estudiante');
  res.send(modelo.add(req));
  res.send('Se creo el estudiante');
}
const updateEstudiante=function(req,res){
  let resultado=modelo.save(req);
  if(resultado){
    res.send('Se actualizo el estudiante');
    res.status(200).json(resultado);
  }else{
    res.status(404).json({error:'No se encontro matricula'});
  }
}
const deleteEstudiante=function (req,res){
  res.send('Borrando estudiante '+req.params.matricula);
  if(modelo.erase(req)){
    res.send('Se borro el estudiante');
  }else{
    res.status(500).json({error:`No se pudo borrar el estudiante: ${req.params.id}` })
  }
};

exports.getAllEstudiantes=getAllEstudiantes;
exports.getEstudiante=getEstudiante;
exports.createEstudiante=createEstudiante;
exports.updateEstudiante=updateEstudiante;
exports.deleteEstudiante=deleteEstudiante;
