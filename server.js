const express = require('express');
const app  = express();

//set static folders
const path = require('path');
app.use(express.static(path.join(__dirname , 'public')));   //foder name ..
// now from here the default directory is public

//setup server to handle socket.io
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const users = require('./public/users');       //for adding users ..

app.get('/',(req,res)=>{
    res.status(200).send('index');
})

app.get('/close',(req,res)=>{
    res.status(200).send("Hope you enjoyed the chatting, see you again !!..<script>window.close();</script>");
})

//Run when client connects
io.on("connection" , socket =>{
    console.log('Connencted to a Client');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })

    socket.on('join',(name)=>{
        const user = users.join(socket.id,name);
        //to a single client
        socket.emit('anoun',`Welcome, ${user.username} to Talk A Lot.`);
        socket.broadcast.emit('anoun',`${user.username} has joined the chat..`);
    })

    socket.on('disconnect',()=>{
        const user = users.leave(socket.id);
        if(user){
            io.emit('anoun',`${user.username} has left the chat!!`);
        }
    })
})

const port = 3000 || process.env.PORT;
server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});