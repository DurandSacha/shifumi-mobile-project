  PROTOCOLE : 

0. install mongoDB, python, parse 
1. create cloud/main.js
2. create config.json and set good variable
3. launch : parse-server --appId 0123456789 --masterKey 0123456789 --databaseURI mongodb://localhost/shifumi
4. Test With PostMan (http://localhost:1337/parse/classes/_U) Get/Post ( { "username" : "stan", "email" : "sacha6623@gmail.com", "password" : "000000" })
- Header : Content/Type : application/json
- Header : X-Parse-Application-Id : 0123456789

5. Connect application (HERE) ( TRY GET/POST REQUEST WITH APPLICATION)  ( Help : SDK javascript )
6. Launch application and server simultaneously
7. Update Parse Code for multi
8. Deploy server (api+bdd)




0. launch dashboard ( it's works ) :
    - npm install -g parse-dashboard
    - parse-dashboard --dev --appId 0123456789 --masterKey 0123456789 --serverURL "http://localhost:1337/parse" --appName ShiFuMi
    - access http://localhost:4040/apps







------------------------------------------------------------------------------- 

SAVE OBJECT IN SERVER PARSE : 

curl -X POST \
-H "X-Parse-Application-Id: APPLICATION_ID" \
-H "Content-Type: application/json" \
-d '{"score":123,"playerName":"Sean Plott","cheatMode":false}' \
https://jsonplaceholder.typicode.com/todos/1

GET OBJECT IN SERVER PARSE : 

curl -X GET \
  -H "X-Parse-Application-Id: APPLICATION_ID" \
  http://localhost:1337/parse/classes/GameScore/2ntvSpRGIK   <------ avec le sha

--------------------------------------------------------------------------------
LINK: 
( guide ) https://docs.parseplatform.org/parse-server/guide/#saving-your-first-object
( docs ) https://docs.parseplatform.org/
( déploiement ) https://guides.codepath.com/android/Configuring-a-Parse-Server
( medium + POSTMAN ) https://medium.com/@stansarr/mise-en-place-et-configuration-de-parse-parse-server-parse-dashboard-abbc1b9b800f
( parse with react native ) https://medium.com/@thobhani.freddy/setup-react-native-app-with-parse-server-and-mongodb-d7c4c5037354
( connect parse and application) : https://docs.parseplatform.org/parse-server/guide/#using-parse-sdks-with-parse-server

( le github parse/community avec README ) : https://github.com/parse-community/parse-server#getting-started
( le github parser/dashboard ) : https://github.com/parse-community/parse-dashboard
