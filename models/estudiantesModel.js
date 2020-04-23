let db=require('./database/db.js');
let estudiantes;
let datos=  db.Estudiante.findAll({
  raw:true
}).then((res)=>{
  estudiantes=res;
});
const findAll=function (){
  return estudiantes;
}
const findById=function(id){
  for(let i=0; i<estudiantes.length;i++){
    if(estudiantes[i].id==id){
      return estudiantes[i];
      break;
    }
  }
}
const findByMatricula=function (matricula){
  for(let i=0; i<estudiantes.length;i++){
    if(estudiantes[i].matricula==matricula){
      return estudiantes[i];
      break;
    }
  }
}
const add=function(req){
  db.Estudiante.create({
    matricula: req.body.matricula,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    nombre: req.body.nombre,
    semestreIngreso:req.body.semestreIngreso,
    creditosCursados:req.body.creditosCursados
  }).then(()=>{
    console.log('Estudiante creado');
  }).catch(err=>{
    console.log(err);
  })
  estudiantes.push(req.body);
}

const save=function(req){
  db.Estudiante.update({
    matricula: req.body.matricula,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    nombre: req.body.nombre,
    semestreIngreso:req.body.semestreIngreso,
    creditosCursados:req.body.creditosCursados
  },
  {
    where:{matricula: req.params.matricula}
  }
).then(()=>{
    console.log('Estudiante actualizado');
  }).catch(err=>{
    console.log(err);
  })

  let matricula2=req.params.matricula;
  let data=req.body;
  let registro=estudiantes.find((e)=>{
    return e.matricula==matricula2;
  });
  if(registro){
    for(let[llave,valor] of Object.entries(data)){
      registro[llave]=valor;
    }
  }
  return registro;
}
const erase=function(req){
  db.Estudiante.destroy({
    where:{matricula:req.params.matricula}
  }).then(()=>{
      console.log('Estudiante borrado');
    }).catch(err=>{
      console.log(err);
    })
  let matricula2=req.params.matricula;
  let registro=estudiantes.find((e)=>{
    return e.matricula=matricula2;
  })
  if(registro){
    if(estudiantes.splice(estudiantes.indexOf(registro),1)!=-1)
      return true;
    return false;
  }
  return false;
  console.log(estudiantes);
};

exports.findAll=findAll;
exports.findById=findById;
exports.findByMatricula=findByMatricula;
exports.add=add;
exports.save=save;
exports.erase=erase;
