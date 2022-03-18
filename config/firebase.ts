import * as admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'



export class FirebaseService {
  private static instance: FirebaseService;

  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;
  //admin: any

  constructor() {
    const serviceAccount: any = {
        type: "service_account",
        project_id: "doctors-5d9fd",
        private_key_id: "ce3aca8f315a313a1eb9ebd6821fe866146389b1",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEFcSJR7jErgks\nKWN1eN6zWO3kn8ohIZLhxYfKvBqCijpQ8GUwzkV0HIG7xbaT+yqv1nLO2V6G7Hht\nydMMMvmAqrDyM/4CQvfIRAwjVCseOadIYdsULyj4/RP0wWivViMRjF31TH9OPvtr\n7LO07xWxzDvfF6v7FS12fwBfHjY29nQCj8rMcpTFjfXKqs8LWQazA/M5D5j0uXK4\nL3ZMKToVksvdkfIM8tcpKxrRwIh2onXCO1FuWMNea5hvO0EKqWmhNO9PhcT2VOLp\nOA/vX6XGJDyZ5VGif0WFiYAAjJHIEaULcXtTSudxIE0h4dfrLPI+x1wZ+DCZhY5t\n0g6cNDPpAgMBAAECggEAAjfy1NDMbOFBNlAzkWEwN9xCOMt8CHruRAKtoiQVsrNo\nrIDDzFURIRqvdxXqFmuJlJq7Cs8XzDQButBFRIaRHx0PSnY/Ifxq/EeU0ZOCt2FU\nnLOKvIQ6FPMcFjFYA1/Ynrq1V3CpohOBWbvAXsQzvSK/7KrCZeFb9dLDCNB5MY78\nNfMQm8LkWLNSategfAs6BMns5TiQfMp/n4MC0rKZUmI0Qax0DbymWEFWLaNqVEXF\npGHAWCVGvAMBushMAzCRhB3S1HGT1tyDKhMghrOEBBkN9R8Yl2TtOoYCxN9MmENp\nXPzYb2jCmHqI/IIYYjIoa92MJ/4KzYxZzUW6TXrWDwKBgQDtaouBjUOOCh+A8r2P\n3ulo0wD8UzoJPh7FtrniUsr7NXLhliD+iUGUwJilhpBSLaQuE4t4GTXplzdtjnh2\n/VWNSlpuq4t1RAblNV0+8DBK0IDbhQ0+3UCdCw7FEpu5FhmKJKl3z0VRwCHCWG2l\nW6wVvFSTYe319ZD9Eth2NZeb9wKBgQDTbwKKNo1p9V/qV9M9j58RAmIEI6WsPvsz\npew6I1et4M5jgK37N37TRaO+Umf7ArNkHK9AxPRIrOG+Mr9oWh3uZp4aWv1+U2nG\nQq+gNCpyZaVufDoMu2YleYiclpHqR/n10oMp7Df9LsqYPJC3uZvsNdCCyvXB8hm7\nxzMNikv3HwKBgQC4JikZDoo0lROEgEOaYUtn/CpKjP96Bc32i1m4+4Dnwrhd04W6\nCJpul8iOs0YkB7TN7GkEeYGAssLSXmx/1tXR5rcoGjTsexxiErdFxyWeEgWwv43b\nkd+5L8eAAoP41vRuWyt7e7CHzWAiD1bUqLtcjJyJSK87VQLl2QU/AyiaVwKBgQCI\nz/E9zBTvdlZtRg0rbY7JK9iOwx5F+a8EeZ4E9K+clLYYDsEFqKBJR2uwEJS2CMZZ\nxnHkoE1N5YhhUWcnuABcLkyp0yzqnED6iFYqfPbmdT1546qQaIatQxoR8SBUD+T/\nmwtCilakXq27mp0uNU1eqGfW6kviBq1+I2S2o0GKkwKBgQC47XV7v9MhytXp31Z4\nu63mJYTyG6zGKimHzv98s0bWPanjQXEqClzTjZ5CmP3b3J5N5XdWc6tMNoLwmR0m\nDxvv5gQ7lvpD/rP4gTAbbs8XLSv4e5uKYE/hwnXBMQfqjm6Kn2z5A1Bd/nAXIdU2\nIsgDWipkxho2UiN3LQoDGEiy9g==\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-jp4hd@doctors-5d9fd.iam.gserviceaccount.com",
        client_id: "105170302230864574669",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jp4hd%40doctors-5d9fd.iam.gserviceaccount.com"
      };

    initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });


    this.db = getFirestore();

    console.log("Created new instance of FirestoreService");
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}
