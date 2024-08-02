import PatientRepository from "./patient.repository.js";



// This is the controller for the patient portion


export default class PatientController {
    constructor() {
        this.patientRepository = new PatientRepository();
    }

    // This is the controller function for adding a patient details
    async addPatientDetails(req, res) {
        
        // Extract the patient's name from the request body
        const name = req.body.name; 
        // Extract the patient's phone number from the query parameters
        const phoneNumber = req.query.phoneNumber; 
        
        // Extract the doctor's name from the JWT token
        // This action is restricted to doctors only
        const doctorName = req.docName;    

        // Extract the doctor's medical association registration number from the JWT token
        const medAssociationReg = req.regNo;

        // Extract the prescription status from the request body
        const status = req.body.status;

        // Call the patientRepository to add a prescription for the patient
        await this.patientRepository.addPrescription(
            name, 
            phoneNumber, 
            doctorName,
            medAssociationReg,
            status
        );
        // Respond with a 201 status code indicating successful prescription update
        res.status(201).send("Prescription updated");
    }
    
    async getPatientDetails(req, res) {
        // Extract the patient ID from the request parameters
        const id = req.params.id;

        // Retrieve prescription details for the patient from the repository
        const prescriptionDetails = await this.patientRepository.getPatientPresDetails(id);

        // Respond with a 200 status code and send the retrieved prescription details
        res.status(200).send(prescriptionDetails);
    }
}


