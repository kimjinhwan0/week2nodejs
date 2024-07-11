# week2nodejs
![image](https://github.com/kimjinhwan0/week2nodejs/assets/174076288/2a9fe0aa-c08f-43db-8447-6179fcf0208a)



madcamp2주차 '새로'의 backend 코드

app.js 코드에는 front의 마니또 방 저장하기, 프로필 정보 등을 get하거나 post 하는 코드가 들어있고 

socket.js socket을 이용해서 만든 채팅방을 만들기 위한 코드가 있다
socket은 클라이언트가 서버에게 연결하면 서버와 계속 연결을 하여 별도의 get요청이나 post 요청없이 정보를 주고 받을 수 있다
채팅은 기본적으로 모두 db에 저장되며 채팅방에 새로 들어곤 사람이 있다면 그 사람에게 그 이전의 채팅으로 모두 보내준다)

client.js 코드는 socket이 정상적으로 작동하는지 확인하기 위해서 만든 코드이다 



