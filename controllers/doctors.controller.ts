import express from "express";
import { DoctorsService } from "../services/doctors.service";
import { Utils } from "../utils/utils";

export class DoctorsController {
    constructor() {
    }

    addDoctor = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {
            const addDoctor = await doctorsService.addDoctor(req.body)
            res.status(200).send(addDoctor);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    addPatientToDoctor = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {
            const addDoctor = await doctorsService.addPatientToDoctor(req.body.doctor, req.body.patient)
            res.status(200).send(addDoctor);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getAllDoctors = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {

            const doctors = await doctorsService.getDoctors(req.query)
            res.status(200).send(doctors);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getDoctorById = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {
            const doctor = await doctorsService.getDoctorById(req.params)
            res.status(200).send(doctor);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    updateDoctor = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {
            const doctorUpdated = await doctorsService.updateDoctor(req.body, req.params)
            res.status(200).send(doctorUpdated);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    deleteDoctor = async (req: express.Request, res: express.Response) => {
        const doctorsService = DoctorsService.getInstance();
        try {
            const doctorDeleted = await doctorsService.deleteDoctor(req.params)
            res.status(200).send(doctorDeleted);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}