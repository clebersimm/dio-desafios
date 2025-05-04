const express = require('express');
const bodyParser = require('body-parser');
const addressRoutes = require('./routes/addresses');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/addresses', addressRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});