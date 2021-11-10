import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port=process.env.PORT || 3000;
let users=[];

app.use((req,res,next)=>{
    console.log("req come",req.body)
    next();
})

app.get('/users',(req,res)=>{
    res.send(users);
})

app.get('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }
    else{
        res.send('user not found')
    }
})

//add record

app.post('/user',(req,res)=>{
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.password || !req.body.city || !req.body.state || !req.body.zip)
    {
        res.status(400).send('invalid code')
    }
    else{
        users.push({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:req.body.password,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,

        })
    }
})

app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.fname){
            users[req.params.id].fname=req.body.fname
        }
        if(req.body.lname){
            users[req.params.id].lname=req.body.lname
        }
        if(req.body.fname){
            users[req.params.id].email=req.body.email
        }
        if(req.body.fname){
            users[req.params.id].password=req.body.password
        }
        if(req.body.fname){
            users[req.params.id].city=req.body.city
        }
        if(req.body.fname){
            users[req.params.id].state=req.body.state
        }
        if(req.body.fname){
            users[req.params.id].zip=req.body.zip
        }
        res.send(users[req.params.id])
        }
    else
        {
            res.send('user not found')
        }
    }

)

app.delete('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        users[req.params.id]={};
        res.send('user deleted');
    }
    else{
        res.send('user not found')
    }
})

app.listen(port,()=>{
    console.log('server is running')
})