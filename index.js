import express from 'express';
import doctorRouter from './src/Doctor/doctor.routes.js';
import patientRouter from './src/Patient/patient.routes.js';
import { connectUsingMongoose } from './src/mongoose.config.js';

const server = express();

// Middleware to parse JSON request bodies
server.use(express.json());



// Route for doctor-related API endpoints
server.use('/api/doctor', doctorRouter);


// Route for patient-related API endpoints
server.use('/api/patient', patientRouter);

server.use('/', (req, res) => {
    res.send('Welcome to Hospital API');
})

server.listen(5000, () => {
    console.log('Server started at 5000');
    connectUsingMongoose();
});