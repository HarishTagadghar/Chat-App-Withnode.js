let socket =  io()

let $form = document.querySelector('#form')
let $input = $form.querySelector('input')
let $location = document.querySelector('#location')


socket.on('message' , (msg)=> {
    console.log(msg);
    
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