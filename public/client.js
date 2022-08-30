const socket = io();
var name; 
do{
    name = prompt("Kindly have a Unique UserName for chatting!!");
}while(!name);      //until we get a name for further ..

socket.emit('join', name);

const textarea = document.querySelector('#textarea');
document.querySelector('.btn').addEventListener('click',()=>{
    if(textarea.value !== ""){
        sendMessage(textarea.value);
        textarea.value = "";
    }
})

function sendMessage(msg) {
    let message = {
        user : name,
        text : msg
    }
    //appending to the dom
    appendMessage(message,'outgoing');

    //sending to the server 
    socket.emit('message',message);
}

let messageArea = document.querySelector('.message_area');

function appendMessage(message,position){
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('message',position);
    
    let content = `
        <h4>${message.user}</h4>
        <p>${message.text}</p>
    `;
    mainDiv.innerHTML = content;
    messageArea.appendChild(mainDiv);
    scrolltoBottom();
//    audio.play();
}

//broad casting the receiving messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
})

socket.on('anoun',(msg)=>{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('message','say');
    let content = `<p>${msg}</p>`;
    mainDiv.innerHTML = content;
    messageArea.appendChild(mainDiv);
    scrolltoBottom();
})

function scrolltoBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}
