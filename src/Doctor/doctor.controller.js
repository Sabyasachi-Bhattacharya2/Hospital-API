import DoctorRepository from "./doctor.repository.js";
import bcrypt from 'bcrypt';
 
export default class DoctorController {
    constructor() {
        this.doctorRepository = new DoctorRepository();
    }

    async doctorRegister(req, res) {
       try{ 
            const {name, medAssociationReg, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const doctor = await this.doctorRepository.signup({
                name: name,
                medAssociationReg: medAssociationReg,
                hashedPassword: hashedPassword
            });
            res.status(201).send(`Registration Done: ${doctor}`);
        } catch(err) {
            res.status(404).send(`Registration failed with ${err}`);
        }
    }

    async doctorSignin(req, res) {
        try {
            const {medAssociationReg, password} = req.body;
            const token = await this.doctorRepository.signin(medAssociationReg, password);
            if(token) {
                res.status(200).send(token);
            } else {
                res.status(404).send('Unauthorised');
            }
        } catch(err) {
            res.status(404).send(`Failed ${err}`);
        }
    }
}