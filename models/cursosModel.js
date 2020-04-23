let db=require('./database/db.js');
let cursos;
let datos=db.Cursos.findAll({
  raw:true
}).then((res)=>{
  cursos=res;
})
const findAll=function(){
  return cursos;
}

const findById=function(id){
  for(let i=0; i<cursos.length;i++){
    if(cursos[i].id==id){
      return cursos[i];
      break;
    }
  }
}
const findByClave=function (clave){
  for(let i=0; i<cursos.length;i++){
    if(cursos[i].clave==clave){
      return cursos[i];
      break;
    }
  }
}
const add=function(req){
  db.Cursos.create({
    clave: req.body.clave,
    nombre: req.body.nombre,
    creditos:req.body.creditos,
  }).then(()=>{
    console.log('Curso creado');
  }).catch(err=>{
    console.log(err);
  })

  cursos.push(req.body);
}
const save=function(req){
  db.Cursos.update({
    clave: req.body.clave,
    nombre: req.body.nombre,
    creditos:req.body.creditos
  },
  {
    where:{clave: req.params.clave}
  }
).then(()=>{
    console.log('Estudiante actualizado');
  }).catch(err=>{
    console.log(err);
  })

  let clave2=req.params.clave;
  let data=req.body;
  let registro=cursos.find((e)=>{
    return e.clave==clave2;
  });
  if(registro){
    for(let[llave,valor] of Object.entries(data)){
      registro[llave]=valor;
    }
  }
  return registro;
}
const erase=function(req){
  db.Cursos.destroy({
    where:{clave:req.params.clave}
  }).then(()=>{
      console.log('Estudiante borrado');
    }).catch(err=>{
      console.log(err);
    })
  let clave2=req.params.clave;
  let registro=cursos.find((e)=>{
    return e.clave=clave2;
  })
  if(registro){
    if(cursos.splice(cursos.indexOf(registro),1)!=-1)
      return true;
    return false;
  }
  return false;
};
exports.findAll=findAll;
exports.findById=findById;
exports.findByClave=findByClave;
exports.add=add;
exports.save=save;
exports.erase=erase;
