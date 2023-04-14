import express from 'express';
import { allergyRouter } from './allergy/allergy.routes';
import { appointmentRouter } from './appointments/appointments.route';
import { authRouter } from './auth/auth.routes';
import { doctorRouter } from './doctor/doctor.routes';
import { examRouter } from './exam/exam.routes';
import { medicineRouter } from './medicine/medicine.routes';
import { patientRouter } from './patient/patient.routes';
import cors from 'cors';
import { conditionRouter } from './condition/condition.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/allergies', allergyRouter);
app.use('/api/v1/medicines', medicineRouter);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/conditions', conditionRouter);
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
