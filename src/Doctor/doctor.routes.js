import express from 'express';
import DoctorController from './doctor.controller.js';



const doctorRouter = express.Router();
const doctorController = new DoctorController();

doctorRouter.post('/register', (req, res) => {
    doctorController.doctorRegister(req, res);
});

doctorRouter.post('/signin', (req, res) => {
    doctorController.doctorSignin(req, res);
});

export default doctorRouter;