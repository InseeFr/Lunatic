const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/recensement/adresse', (request, response) => {
	console.log('body', request.body); // on n'en fait rien, c juste un mock !
	response
		.status(201)
		.json({ NUMVOIE: '14', LIBVOIE: 'DE-PICPUS', TYPEVOIE: 'RUE' });
});

app.listen(port, () => {
	console.log(`Test app listening at http://localhost:${port}`);
});
