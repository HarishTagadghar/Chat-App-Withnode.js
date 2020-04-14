let socket =  io()

socket.on('message' , (msg)=> {
    console.log(msg);
    
})

document.querySelector('#form').addEventListener('submit' , (e) => {
    e.preventDefault()
    let message = e.target.elements.message.value
    socket.emit('sentmessage' , message)
})