import express from 'express';
import { patientRouter } from './patient/patient.routes';

const app = express();

app.use(express.json());

app.use('/api/v1/patients', patientRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
