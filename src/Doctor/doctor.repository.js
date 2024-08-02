import mongoose from "mongoose";
import { doctorSchema } from "./doctor.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const DoctorModel = mongoose.model('Doctor', doctorSchema);

export default class DoctorRepository {
    async signup(doctor) {

        try {
            const newUser = new DoctorModel(doctor);
            await newUser.save();
            return "Successful signing up";
        } catch (err) {
            return err;
        }
    }

    async signin(medAssociationReg, password){
        // Find the doctor by their medical association registration number
        const loggedDoctor = await DoctorModel.findOne({medAssociationReg: medAssociationReg});


        if(!loggedDoctor) {
            // Return an error message if no doctor is found
            return "Doctor not found please recheck your registration number";
        }

        // Get the hashed password stored in the database
        const dbPassword = loggedDoctor.hashedPassword;

        // Compare the provided password with the stored hashed password
        const checkPassword = await bcrypt.compare(password, dbPassword);

        if(checkPassword) {
            // Generate a JWT token if the password is correct
            const token = jwt.sign({
                    name: loggedDoctor.name,
                    regNo: loggedDoctor.medAssociationReg 
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                }
            );
            return token;
        } else {
            return "Please enter correct password";
        }
    }
}