let socket =  io()

socket.on('message' , (msg)=> {
    console.log(msg);
    
})

document.querySelector('#form').addEventListener('submit' , (e) => {
    e.preventDefault()
    let message = e.target.elements.message.value
    socket.emit('sentmessage' , message)
})

document.querySelector('#location').addEventListener('click',(e)=> {
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('your brouser dont support the geolocation ')
    }
    navigator.geolocation.getCurrentPosition((position)=> {
        socket.emit('sharelocation', `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`)
    })
})