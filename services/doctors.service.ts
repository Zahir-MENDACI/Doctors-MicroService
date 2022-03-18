import { GeoPoint } from "firebase-admin/firestore";
import { DoctorsDAO } from "../daos/doctors.dao";
import Doctor from "../models/Doctor"


export class DoctorsService {
    private static instance: DoctorsService;
    dao: DoctorsDAO;

    constructor() {
        this.dao = DoctorsDAO.getInstance();
    }

    static getInstance(): DoctorsService {
        if (!DoctorsService.instance) {
            DoctorsService.instance = new DoctorsService();
        }
        return DoctorsService.instance;
    }


    async addDoctor(resources: any) {
        try {
            const doctor = new Doctor(undefined, resources.name, resources.age, resources.speciality, new GeoPoint(resources.position.lat, resources.position.long), [], new Date(), new Date())
            const doctorDao = await this.dao.add(doctor)
            return doctorDao
        } catch (error) {
            throw error
        }
    }

    async addPatientToDoctor(doctorId: string, patientId: string) {
        try {
            const checkIfDoctorExist = await this.dao.getDoctorById(doctorId)
            if (checkIfDoctorExist !== null) {
                const doctorDao = await this.dao.addPatientToDoctor(doctorId, patientId)
                return doctorDao
            } else {
                throw "Doctor doesn't exist"
            }
        } catch (error) {
            throw error
        }
    }

    async getDoctors(resources: any) {
        let returnValue = []
        try {
            // let position: any;
            // if (resources.position != null && resources.position != undefined && resources.position.length > 0) {
            //     position = JSON.parse(resources.position);
            // }
            const doctorDao = await this.dao.getDoctors(resources.speciality as string, Number(resources.latitude), Number(resources.longitude), Number(resources.distance))
            return doctorDao
        } catch (error) {
            throw error
        }
    }

    async getDoctorById(resources: any) {
        try {
            const doctorId = resources.id
            const doctorDao = await this.dao.getDoctorById(doctorId)
            return doctorDao
        } catch (error) {
            throw error
        }
    }

    async updateDoctor(resources: any, resourcesId: any) {
        try {
            const doctorId = resourcesId.id
            const doctor = new Doctor(resources.id, resources.name, resources.age, resources.speciality, resources.city, resources.patients, resources.createdAt, new Date())
            const doctorDao = await this.dao.updateDoctor(doctorId, resources)
            return doctorDao
        } catch (error) {
            throw error
        }
    }

    async deleteDoctor(resources: any) {
        try {
            const doctorId = resources.id
            const doctorDao = await this.dao.deleteDoctor(doctorId)
            return doctorDao
        } catch (error) {
            throw error
        }
    }
}