import mongoose from "mongoose"
import { patientSchema, prescriptionArray } from "./patient.schema.js"



const PatientModel = mongoose.model('Patient', patientSchema);
const PrescriptionArrayModel = mongoose.model('Prescription', prescriptionArray);

export default class PatientRepository { 
    async addPrescription(name, phoneNumber, doctorName, medAssociationReg, status) {
        const patient = await PatientModel.findOne({phoneNumber: phoneNumber});

        // Create a new prescription object
        console.log(phoneNumber)
        const prescriptionArray = new PrescriptionArrayModel({
            doctorName: doctorName,
            medReg: medAssociationReg,
            status: status
        });
        if(!patient) {

            // If the patient doesn't exist, create a new patient record with the prescription
            const newPatient = new PatientModel({
                name: name,
                phoneNumber: phoneNumber,
                prescriptions: [prescriptionArray]
            });
            await newPatient.save();
            return;
        }

        // If the patient exists, add the prescription to their record
        patient.prescriptions.push(prescriptionArray);
        await patient.save();
        return;
    }

    async getPatientPresDetails(id) {
        // Simple function!!!!! 
        // Finding & returning the patient's prescriptions
        try {
            const patient = await PatientModel.findById(id);
            return patient.prescriptions;
        } catch (err) {
            return "Wrong patient id";
        }
    }
}