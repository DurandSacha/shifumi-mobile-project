import Parse from 'parse';

class Database {

    // use for get an object in database by ID
    get = async (className, id) => {
        let Object = Parse.Object.extend(className, null, null);
        let query = new Parse.Query(Object);
        return query.get(id)
            .then((obj) => {
                //console.log('database get :' + obj)
                return obj;
            }, (error) => {
                //console.log('database get :' + error.message);
                return null;
            });
    }

    // use for listening a row in database
    listen = async (className, id, onUpdate) => {
        let query = new Parse.Query(className);
        query.equalTo("objectId", id);
        let subscription = await query.subscribe();
        subscription.on('update', onUpdate);
        /*
        subscription.on('update', function (message) {
            console.log("database updated :  ", message); 
        });
        console.log('-------------------------------------------------------------')
        */

        return subscription;
    }

    // use for listening a row in database
    listenPlayer = async (className, id, onUpdate) => {
        let query = new Parse.Query(className);
        query.equalTo("objectId", id);
        //query.greaterThan("player2", '0');          //query.greaterThan("like", 1);
        query.notEqualTo('player2', 0)
        let subscription = await query.subscribe();
        subscription.on('update', onUpdate);
        /*
        subscription.on('update', function (message) {
            console.log("Player changed in database :  ", message); 
        });
        console.log('-------------------------------------------------------------')
        */

        return subscription;
    }

    // use for listening a row in database
    listenScore = async (className, id, onUpdate) => {

        let query = new Parse.Query(className);
        query.equalTo("objectId", id);
        //query.equalTo("P1Point", '0');
        let subscription = await query.subscribe();
        subscription.on('update', onUpdate);

        
        subscription.on('update', function (message) {
            console.log("Score updated in database :  ", message); 
        });
        console.log('-------------------------------------------------------------')
        

        return subscription;
    }

}

const db = new Database();

export default db;
