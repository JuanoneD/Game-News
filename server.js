const express = require('express');
const routes = require('./routes');
const fs = require('fs');

const app = express();

/*
let wasCleanedUp = false;
const runBeforeExiting = () =>
{
    const exitSignals = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'];
    for (const signal of exitSignals)
    {
        process.on(signal, () =>
        {
            if(!wasCleanedUp)
            {
                const path = "public/sessions/";
                fs.readdirSync(path).forEach
                (
                    (file) => 
                    {
                        console.log(path + file);
                        fs.unlinkSync(path + file, (err) => {console.log(err)});
                    }
                );
                wasCleanedUp = true;
            }
            process.exit();
        });
    }
};
*/

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(routes);
// runBeforeExiting();
app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));