let socket =  io()

let $form = document.querySelector('#form')
let $input = $form.querySelector('input')
let $location = document.querySelector('#location')
let $message = document.querySelector('#message')
let $message_template = document.querySelector('#message-template').innerHTML
let $location_template = document.querySelector('#location-template').innerHTML

socket.on('message' , (msg)=> {
    console.log(msg);
    let html = Mustache.render($message_template , {
        message:msg
    })
    $message.insertAdjacentHTML('beforeend' , html)
    
})

socket.on('location-message' , (url) => {
    console.log(url);
    let html = Mustache.render($location_template, {
        url:url
    })
    $message.insertAdjacentHTML('beforeend' , html)
})

$form.addEventListener('submit' , (e) => {
    e.preventDefault()
    let message = e.target.elements.message.value
    socket.emit('sentmessage' , message , (error) => {
        if(error) {
            return console.log(error);
            
        }
        console.log('message delivered!');
        $input.value = ''
        $input.focus();
        
    })
})

$location.addEventListener('click',(e)=> {
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('your brouser dont support the geolocation ')
    }
    navigator.geolocation.getCurrentPosition((position)=> {
        socket.emit('sharelocation', `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}` , () => { console.log(`location shared`);
        })
    })
})