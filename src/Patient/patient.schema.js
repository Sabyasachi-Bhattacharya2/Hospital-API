import mongoose from "mongoose";

export const prescriptionArray = new mongoose.Schema({
    doctorName: String,
    medReg: String,
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
    },
    date: {
        type: Date, default: Date.now
    }
})


export const patientSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    prescriptions: [prescriptionArray]

});

patientSchema.pre('save', function(next) {
    const now = new Date();
    this.date = now;
    next();
})