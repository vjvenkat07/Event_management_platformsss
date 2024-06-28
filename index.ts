import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './src/routes/eventRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
