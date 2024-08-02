import jwt from 'jsonwebtoken';

const jwtAuth = async(req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.regNo = payload.regNo;
        req.docName = payload.name;
    } catch(err) {
        console.log(err);
        return res.status(401).send('Unauthorised');
    }
    next();
}

export default jwtAuth;