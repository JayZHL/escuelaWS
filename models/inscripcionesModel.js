let db=require('./database/db.js');
let todo;
let resultado;

const getAllInscripciones= async function(){
  await db.Estudiante.findAll({
    include:[db.Cursos]
  }).then((inscripciones)=>{
    todo=inscripciones;
  });
  return todo
}
const getEstudianteCurso= async function (req){
  let {id}=req;
  await db.Estudiante.findByPk(id,{
    include:[db.Cursos]
  }).then((estudiantes)=>{
    if(estudiantes){
      resultado=estudiantes;
    }else{
      console.log('No se encontro');
    }
  });
  return resultado;
};
const add=function(req){
  db.Inscripciones.create({
    estudianteid: req.body.estudianteid,
    cursoid: req.body.cursoid
  }).then(()=>{
    console.log('Estudiante Inscrito');
  }).catch(err=>{
    console.log(err);
  })
}

const erase=function(req){
  db.Inscripciones.destroy({
    where:{id:req.params.id}
  }).then(()=>{
      console.log('Dado de baja');
    }).catch(err=>{
      console.log(err);
    })

};
exports.getAllInscripciones=getAllInscripciones;
exports.getEstudianteCurso=getEstudianteCurso;
exports.add=add;
exports.erase=erase;
