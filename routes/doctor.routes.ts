import express from "express"
import { DoctorsController } from "../controllers/doctors.controller";


const router = express.Router();

const doctorsController = new DoctorsController();

router.post('/doctors', doctorsController.addDoctor);
router.post('/addPatientToDoctor', doctorsController.addPatientToDoctor);
router.get('/doctors', doctorsController.getAllDoctors);
router.get('/doctors/:id', doctorsController.getDoctorById);
router.put('/doctors/:id', doctorsController.updateDoctor);
router.delete('/doctors/:id', doctorsController.deleteDoctor);



export default {
    routes: router
}