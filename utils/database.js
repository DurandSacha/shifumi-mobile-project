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

    // use for listening a row in database, and make something if element was update   /notEqualTo  //equalTo
    listen = async (className, id, onUpdate) => {
        let query = new Parse.Query(className);
        query.equalTo("objectId", id);
        let subscription = await query.subscribe();
        subscription.on('update', onUpdate); // open // update // enter

        subscription.on('update', function (message) {
            console.log("database updated from listen in database: ", message); 
        });

        return subscription;
    }

}

const db = new Database();

export default db;
