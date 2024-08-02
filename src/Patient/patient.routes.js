import express from 'express';
import PatientController from './patient.controller.js';
import jwtAuth from '../jwt.middleware.js';


const patientRouter = express.Router();
const patientController = new PatientController();


// Route to get to register a new patient and upload a new prescription
// This can only be done by a doctor 
patientRouter.get('/register', jwtAuth, (req, res) => {
    patientController.addPatientDetails(req, res);
});


// Route to get the details of all the precriptions that has been made 
// to a specific patient
patientRouter.get('/:id/createReport', (req, res) => {
    patientController.getPatientDetails(req, res);
});

export default patientRouter;