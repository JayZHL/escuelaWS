const modelo=require('../models/cursosModel');
let datos;

const getAllCursos=function(req,res){
  if(req.query.clave){
    return res.status(200).json(modelo.findByClave(req.query.clave));
  }
  res.status(200).json(modelo.findAll());
}
const getCurso=function(req,res){
  datos=modelo.findByClave(req.params.clave,res);
  if(datos){
    console.log(datos);
    res.status(200).json(datos);
  }else{
    res.status(404).json({error:'No se encontro'});
  }
}
const createCurso=function(req,res){
  res.send('Creando un nuevo curso');
  res.send(modelo.add(req));
  res.send('Se creo el curso');
}
const updateCurso=function(req,res){
  let resultado=modelo.save(req);
  if(resultado){
    res.send('Se actualizo el curso');
    res.status(200).json(resultado);
  }else{
    res.status(404).json({error:'No se encontro el curso'});
  }
}
const deleteCurso=function (req,res){
  res.send('Borrando curso '+req.params.clave);
  if(modelo.erase(req)){
    res.send('Se borro el curso');
  }else{
    res.status(500).json({error:`No se pudo borrar el curso: ${req.params.clave}` })
  }
};
exports.getAllCursos=getAllCursos;
exports.getCurso=getCurso;
exports.createCurso=createCurso;
exports.updateCurso=updateCurso;
exports.deleteCurso=deleteCurso;
