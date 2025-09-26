- add see all games functionality. 
- 
<---------------------------->

Goal: modify server to write to database whenever a player creates a game or makes a move. 

state: 
actions that can be done 
- make a new game => add a new gamestate to the db 
- make a move => modify an existing gamestate in the db 


make a new game. 
- create a game object then add it to database 
params needed: name 

i need to query db by name, and then send it if it exists. if it doesnt exist, i will create it and send it into db. 

i think ur WRITING to the server every 5 secs, i want to get FROM the server every 5 secs. 

lets put server response if there is a game, so it doesnt keep writing. 

<---------------------------->
x implement reset 
implement tie detection 
clean up a little bit? 
implement show all games. 

dont understand settimeout vs setinterval: 
setinterval doesnt pus calls on the stack but simply runs every interval or gets put on the stack every so often? 
settimeout pushes call on the stack and says call it when time runs out 



how settimeout and setinterval cause memory leak
what is memory leak 





























