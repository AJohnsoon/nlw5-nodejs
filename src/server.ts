import express from 'express';

const app = express();

app.get('/', (req, res)=>{
    return res.json({
        message: 'NLW05'
    })
})

app.post('/users', (req, res)=>{
    return res.json({
        message: 'user saved successfully',
    })
})

app.listen(3333, ()=>{
    console.log('server is runnig')
} )