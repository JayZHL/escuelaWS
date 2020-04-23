const Sequelize=require('sequelize');
const sequelize= new Sequelize(
    'escolarws',
    'backenduser',
    'superpassword',{
      host:'localhost',
      dialect: 'mysql'
    });

const Estudiante=sequelize.define('estudiantes',{
  matricula:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique: true
  },
  apellidoPaterno:{
    type:Sequelize.STRING,
    allowNull:false
  },
  apellidoMaterno:{
    type:Sequelize.STRING,
    allowNull:false
  },
  nombre:{
    type:Sequelize.STRING,
    allowNull:false
  },
  semestreIngreso:{
    type: Sequelize.STRING,
    allowNull: true
  },
  creditosCursados:{
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 0
  }
});
Estudiante.associate = function(models) {
  Estudiante.belongsToMany(models.Cursos,{
    through: models.EstudianteCursos
  });
};
const Cursos=sequelize.define('cursos',{
  clave:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique: true
  },
  nombre:{
    type:Sequelize.STRING,
    allowNull:false
  },
  creditos:{
    type: Sequelize.STRING,
    allowNull: false
  }
});
Cursos.associate = function(models) {
  Cursos.belongsToMany(models.Estudiante,{
    through: models.EstudianteCursos
  })
};

const Inscripciones=sequelize.define('inscripciones',{
  estudianteid:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique: true
  },
  cursoid:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique: true
  }
});
Estudiante.belongsToMany(Cursos,{through:'inscripciones',foreignKey:'estudianteid'});
Cursos.belongsToMany(Estudiante,{through:'inscripciones',foreignKey:'cursoid'});
exports.Estudiante=Estudiante;
exports.Cursos=Cursos;
exports.Inscripciones=Inscripciones;
exports.sequelize=sequelize;
exports.Sequelize=Sequelize;
