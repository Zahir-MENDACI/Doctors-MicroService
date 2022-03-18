import * as admin from "firebase-admin"
import { GeoPoint } from "firebase-admin/firestore";

class Doctor {

  id: string;
  name: string;
  age: number;
  speciality: string;
  position: GeoPoint;
  patient: string[];
  createdAt: Date;
  updatedAt: Date;
  
    constructor(id: string, name: string, age: number, speciality: string, position: GeoPoint, patient: string[], createdAt: Date, updatedAt: Date) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.speciality = speciality;
            this.position = position;
            this.patient = patient;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }

    static doctorConverter = {
        toFirestore(doctor: Doctor) {
          const returnValue: any = {
            id: doctor.id,
            name: doctor.name,
            age: doctor.age,
            speciality: doctor.speciality,
            position: doctor.position,
            patient: doctor.patient,
            createdAt: doctor.createdAt,
            updatedAt: doctor.updatedAt
          };
    
          Object.keys(returnValue).forEach((key) => {
            
            if (returnValue[key] === undefined) {
              delete returnValue[key];
            }
            if (returnValue[key] === null) {
              returnValue[key] = null
            }
          })
    
          return returnValue;
        },

        fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot) {
          const data = snapshot.data();
          let formatedDate;
          if (data.createdAt) {
            formatedDate = data.createdAt.toDate();
          }
          let formatedUpdatedDate;
          if (data.updatedAt) {
            formatedUpdatedDate = data.updatedAt.toDate();
          }
    
          const returnValue = new Doctor(
            snapshot.id,
            data.name,
            data.age,
            data.speciality,
            data.position,
            data.patient,
            data.formatedDate, 
            data.formatedUpdatedDate
          );
          return returnValue;
        },
      };
}
export default Doctor;