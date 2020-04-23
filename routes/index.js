const express= require('express');
const router=express.Router();
const estudiantesController=require('../controllers/estudiantesControllers');
const cursosController=require('../controllers/cursosController');
const inscripcionesController=require('../controllers/inscripcionesController');
router.use(express.json());

router.get('/estudiantes/',estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:matricula',estudiantesController.getEstudiante);
router.post('/estudiantes/',estudiantesController.createEstudiante);
router.put('/estudiantes/:matricula',estudiantesController.updateEstudiante);
router.delete('/estudiantes/:matricula',estudiantesController.deleteEstudiante);

router.get('/cursos/',cursosController.getAllCursos);
router.get('/cursos/:clave',cursosController.getCurso);
router.post('/cursos/',cursosController.createCurso);
router.put('/cursos/:clave',cursosController.updateCurso);
router.delete('/cursos/:clave',cursosController.deleteCurso);

router.get('/inscripciones/',inscripcionesController.getAllInscripciones);
router.get('/inscripciones/:id',inscripcionesController.getEstudianteCurso);
router.post('/inscripciones/',inscripcionesController.createInscripciones);
router.delete('/inscripciones/:id',inscripcionesController.deleteInscripciones);
module.exports=router;
