import mongoose from "mongoose";

export const doctorSchema = new mongoose.Schema({
    name: String,
    medAssociationReg: String,
    hashedPassword: String
});