import Parse from 'parse';

class Database {

    get = async (className, id) => {
        let Object = Parse.Object.extend(className, null, null);
        let query = new Parse.Query(Object);
        return query.get(id)
            .then((obj) => {
                //console.log(obj)
                return obj;
            }, (error) => {
                console.log(error.message);
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                return null;
            });
    }

    listen = async (className, id, onUpdate) => {
        let query = new Parse.Query(className);
        query.equalTo("objectId", id);
        let subscription = await query.subscribe();
        subscription.on('update', onUpdate);

        return subscription;
    }

}

const db = new Database();

export default db;
