const Sequelize =require('sequelize');
const sequelize= new Sequelize(
  'escolarws',
  'backenduser',
  'superpassword',
  {
    host: 'localhost',
    dialect: 'mysql',
  });

const Estudiante=sequelize.define('estudiante',{
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
  Estudiante.sync({force:true});
  Cursos.sync({force:true});
  Inscripciones.sync({force:true});
