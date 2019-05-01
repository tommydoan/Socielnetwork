const express=require('express');

const mongoose=require('mongoose');

const app=express();

const config=require('config');

const db=config.get('mongoURI');

mongoose.connect(db).then(()=>console.log('Mongoose Connected ...'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));