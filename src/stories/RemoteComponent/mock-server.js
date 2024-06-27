const express = require('express');
const cors = require('cors');
const parse = require('url').parse;
const parser = require('path-match')({
	// path-to-regexp options
	sensitive: false,
	strict: false,
	end: false,
});
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const router = express.Router();
const match = parser('/api/recensement/adresse/departement/:DEP_CODE/commune/:COM_CODE')
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);


router.get('/api/recensement/adresse/*', function (request, response) {
	console.log(request.path)

	var params = match(request.path);
	console.log(request.originalUrl, params)
	response.status(200).json({
		"NUMVOI_LOC_SUGG": "14",
		"BISTER_LOC_SUGG": null,
		"TYPEVOI_LOC_SUGG": "rue",
		"NOMVOI_LOC_SUGG": "de Picpus",
		RESPONSE: true
	});
});

app.listen(port, () => {
	console.log(`Test app listening at http://localhost:${port}`);
});
