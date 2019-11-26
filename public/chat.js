const  socket =io('')
//DOM elements
let   output = document.getElementById('output');
let   message = document.getElementById('message');
let   username = document.getElementById('username');
let   actions = document.getElementById('actions');
let   btn = document.getElementById('send');

btn.addEventListener('click',function() {
    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    })
});

socket.on('chat:message',(data)=>{    
    actions.innerHTML =""
    output.innerHTML +=`
    <p> <strong>${data.username}</strong>: ${data.message}
    </p><br>`
    
})

message.addEventListener('keypress',function () {
    socket.emit('chat:tipying',{username: username.value})
})

socket.on('chat:tipying',(data)=>{    
    actions.innerHTML =`
    <p> <em>${data.username}</em> is typing a message
    </p>`
})

socket.on('user',(data)=>console.log(data))