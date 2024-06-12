const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/recensement/adresse', (request, response) => {
	console.log('body', request.body); // on n'en fait rien, c juste un mock !
	const { ZC, ADR_RANG, LOG_RANG } = request.body;
	if (ZC && ADR_RANG && LOG_RANG) {
		response.status(201).json({
			NUMVOI_LOC_SUGG: '14',
			BISTER_LOC_SUGG: null,
			TYPEVOI_LOC_SUGG: 'Rue',
			NOMVOI_LOC_SUGG: 'de Picpus',
			RESPONSE: true,
		});
	} else {
		response.status(404).json({ RESPONSE: false });
	}
});

app.listen(port, () => {
	console.log(`Test app listening at http://localhost:${port}`);
});
