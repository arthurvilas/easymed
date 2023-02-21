import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
