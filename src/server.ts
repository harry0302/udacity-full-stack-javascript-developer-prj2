import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8082;

app.use(bodyParser.json());

app.use(morgan('short'));

app.use('/', router);

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});

export default app;
