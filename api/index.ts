import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/search', searchRoutes);

app.get('/', (req, res) => {
  	res.send("Hello World")
});

app.listen(port, () => {
	console.log("App listening on port ", port);
});