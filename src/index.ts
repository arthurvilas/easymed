import express from 'express';
import { authRouter } from './auth/auth.routes';
import { doctorRouter } from './doctor/doctor.routes';
import { patientRouter } from './patient/patient.routes';

const app = express();

app.use(express.json());

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
