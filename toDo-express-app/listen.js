const app = require('./app.js');
const { PORT = 4000 } = process.env;

app.listen(PORT, (err) => {
    if(err) console.log(err)
    else console.log('Server is listening on ${PORT}')
})