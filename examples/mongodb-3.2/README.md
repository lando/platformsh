Platform.sh MongoDB 3.2 Example
===============================

This example exists to test this plugin's implementation of Platform.sh's `mongodb:3.2` service.

* [`mongodb:3.2`](https://docs.platform.sh/configuration/services/mongodb.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should start up successfully
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should have the expected platformsh containers and images
docker ps --filter label=com.docker.compose.project=landoplatformshmongodb32 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshmongodb32_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshmongodb32 | grep docker.registry.platform.sh/mongodb-3.2 | grep landoplatformshmongodb32_mongo_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all mongodb containers as mongodb
lando ssh -s mongo -c "id" | grep mongodb

# Should be running the correct mongodb versions
lando ssh -s mongo -c "mongod --version" | grep "db version" | grep "v3.2."

# Should have the mongodb php extension installed
lando php -m | grep mongodb

# Should be able to connect to the relationship successfully
lando mongo -u main -p main --authenticationDatabase main --eval "printjson('ping')" main

# Should be able to connect to mongodb from application containers
lando ssh -s app -c "curl localhost/mongo.php" | grep "Found Rey (Jedi)"

# Should persist data after a rebuild
lando mongo -u main -p main --authenticationDatabase main --eval "printjson(db.createCollection('lando'))" main
lando rebuild -y
lando mongo -u main -p main --authenticationDatabase main --eval "printjson(db.getCollectionNames())" main | grep lando
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be able to destroy our app
lando destroy -y

# Should poweroff
lando poweroff
```
