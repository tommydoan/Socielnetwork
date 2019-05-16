const express=require('express');

const mongoose=require('mongoose');
const path=require('path');
const app=express();
app.use(express.json())
const config=require('config');

const db=config.get('mongoURI');

mongoose.connect(db,{ useNewUrlParser: true, useCreateIndex:true, useFindAndModify: false }).then(()=>console.log('Mongoose Connected ...'));

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profiles',require('./routes/api/profiles'));

// serve static assets in production
if(process.env.NODE_ENV==='production'){
    // srt static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));