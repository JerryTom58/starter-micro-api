



function getQueryString(name) {
    const url_string = location.href; // window.location.href
    const url = new URL(url_string);
    return url.searchParams.get(name);
  }
  
  console.log(getQueryString('name')) // mick
  console.log(getQueryString('room')) // 20
  











const socket = io();




































//const params = window.Qs.parse(location.search, {ignoreQueryPrefix: true});

function getQueryString(name) {
    const url_string = location.href; // window.location.href
    const url = new URL(url_string);
    return url.searchParams.get(name);
  }
  
  console.log(getQueryString('name')) // mick
  console.log(getQueryString('room')) // 20

const name = getQueryString('name')
const room =getQueryString('room')

const scroll = function(){
    const rightPanel = document.querySelector('.right-panel');
    const messageContainer = document.querySelector('.message-container');
    rightPanel.scrollTop = messageContainer.scrollHeight
}



socket.on('sys', message => {
    console.log(message);
})

socket.emit('join', {name,room});//发送人员进入
socket.on('roomUsers',userList => {
    const userListEL = document.querySelector('.user-list');
    document.querySelector('.room-name').innerHTML = room;
    let listHtml = ""
    userList.map(user => {
        listHtml += `<li class="list-group-item">${user.name}</li>`
    })
    while(userListEL.childNodes.length > 3){
        userListEL.removeChild(userListEL.lastChild);
        
    }

    userListEL.innerHTML += listHtml;

})


document.getElementById('chat-form').addEventListener('submit' , e =>{
    e.preventDefault();

    const msgEL = document.getElementById('msg')

    if(!msgEL.value){
        
        return;
    }    

    socket.emit('chat' , {name, content:document.getElementById('msg').value});
    msgEL.value = '';
})



socket.on('chat', message => {
    const isMine = message.name === name
    document.querySelector('.message-container').innerHTML += `
    <div class="d-flex ${isMine ? 'justify-content-end' : 'justify-content-start'} my-3">
        <div class="card ${isMine ? 'bg-success text-light' : "bgcolor='rgb(225,255,255)'"} w-30 ">
            <div class="card-body">
                <div class="card-title">${isMine ? '我自己('+message.name+')' : '对方('+message.name+')'}</div>
                <div class="card-text">${message.content}</div>
            </div>
        </div>
    </div>
    `
    scroll();
})

socket.on('sysConnect', message => {
    socket.on('sysConnect', message)
    document.querySelector('.message-containter').innerHTML += `
    
        <div class="card justify-content  bg-black">
            <div class="card-body">

                <div align="center" class="card-text">${server233 ? (message) : '服务端未连接'}</div>
            </div>
        </div>
    
    `
})

                 //   <div class=" ">
                 //       <div class="card w-30">
                 //           <div class="card-body">
                 //               fuck cat
                 //           </div>
                 //       </div>
                 //   </div>

                 