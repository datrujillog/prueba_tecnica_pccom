const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { config } = require('./config/config');

const router = require('./router/index');

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//utilas rutas
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Mixed Content: The page at 'https://
app.use((req, res, next) => {
    if(req.headers['x-forwarded-proto'] !== 'https' && config.env === 'production') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
});


app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({ message: error.message || error });
});



app.listen(config.port, () => {
    console.log("Server is running on port " + config.port);
    console.log("http://localhost:" + config.port + "/api/");
  });
  

module.exports = app;