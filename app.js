const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

// Middleware to parse text (including XML) bodies
app.use(bodyParser.text({ type: 'text/xml' }));

// Route to handle POST requests of XML data
app.post('/convert', (req, res) => {
    const xmlData = req.body;

    // Convert XML to JSON
    xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Failed to convert XML to JSON",
                error: err.message
            });
        }

        // Send back the JSON response
        res.json(result);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

