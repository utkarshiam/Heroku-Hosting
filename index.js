const express = require('express')
const socketIO= require('socket.io')
const path = require('path')
const PORT = process.env.PORT || 3000
const INDEX = path.join(__dirname, 'public', 'index.html');
console.log(INDEX)



const server= express()
  .use(express.static(path.join(__dirname, 'public')))
  .use((req,res)=> res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const io= socketIO(server):

io.on('connection', (socket)=>{
	console.log('client connected');
	socket.on('message', function(chat){
		socket.broadcast.emit('message', chat)
	})
	socket.on('disconnect', ()=> console.log('Client disconnected'))
})  
