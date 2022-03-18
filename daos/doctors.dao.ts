import * as admin from "firebase-admin"
import { CollectionReference, GeoPoint, Query } from "firebase-admin/firestore";
import { FirebaseService } from "../config/firebase";
import Doctor from "../models/Doctor";
import * as geofirestore from 'geofirestore';

export class DoctorsDAO {
    private static instance: DoctorsDAO;
    db: admin.firestore.Firestore;

    constructor() {
        this.db = FirebaseService.getInstance().db;
        console.log("Created new instance of MerchantsFirestoreDAO");
    }

    static getInstance(): DoctorsDAO {
        if (!DoctorsDAO.instance) {
            DoctorsDAO.instance = new DoctorsDAO();
        }
        return DoctorsDAO.instance;
    }



    async add(doctor: Doctor) {
        try {
            const docRef = this.db.collection("doctors").withConverter(Doctor.doctorConverter).doc()
            doctor.id = docRef.id
            await docRef.set(doctor)
            return ""
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async addPatientToDoctor(doctorId: string, patientId: string) {
        try {
            const docRef = await this.db.collection("doctors").doc(doctorId).set({patients: admin.firestore.FieldValue.arrayUnion(patientId)}, {merge: true})
            return ""
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getDoctors(speciality: string, latitude: number, longitude: number, distance: number) {
        // const GeoFirestore = geofirestore.initializeApp(this.db);
        let returnValue: Doctor[] = []
        try {
            let query: Query = this.db.collection("doctors").withConverter(Doctor.doctorConverter)

            if (speciality !== undefined && latitude !== undefined && longitude !== undefined && distance !== undefined){
                query = this.getNearest(query, speciality, latitude, longitude, distance)
            }
            const snapshot = await query.get()
            snapshot.forEach((doc: any) => {
                returnValue.push(doc.data() as Doctor)
            });
            return returnValue
        } catch (error) {
            throw error
        }
    }

    getNearest(query: Query, speciality: string, latitude: number, longitude: number, distance: number) {

                // ~1 mile of lat and lon in degrees
                let lat = 0.0144927536231884
                let lon = 0.0181818181818182


                // let latitude: number = position.lat as number
                // let longitude: number = position.long as number
                distance = distance * 0.621371
                
                let lowerLat = latitude - (lat * distance)
                let lowerLon = longitude - (lon * distance)
            
                let greaterLat = latitude + (lat * distance)
                let greaterLon = longitude + (lon * distance)
            
                let lesserGeopoint = new GeoPoint(lowerLat, lowerLon)
                let greaterGeopoint = new GeoPoint(greaterLat, greaterLon)
            
                // return docRef
                //         .whereGreaterThan("location", lesserGeopoint)
                //         .whereLessThan("location", greaterGeopoint)
            
            // const geoPoint = new GeoPoint(48.89790154016949, 2.2169465251122964)
            query = query.where("position", ">", lesserGeopoint).where("position", "<", greaterGeopoint).where("speciality", "==", speciality)

            return query
    }

    async getDoctorById(doctorId: string) {
        let returnValue: Doctor = null
        try {
            const snapshot = await this.db.collection("doctors").doc(doctorId).withConverter(Doctor.doctorConverter).get()
            if (snapshot.exists) {
                returnValue = snapshot.data()
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async updateDoctor(doctorId: string, doctor: Doctor) {
        try {
            const doctorUpdate = await this.db.collection("doctors").doc(doctorId).withConverter(Doctor.doctorConverter).set(doctor, { merge: true })
            return doctorUpdate
        } catch (error) {
            throw error
        }
    }

    async deleteDoctor(doctorId: string) {
        try {
            const doctorDelete = await this.db.collection("doctors").doc(doctorId).delete()
            return doctorDelete
        } catch (error) {
            throw error
        }
    }
}