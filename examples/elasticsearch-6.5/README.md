Platform.sh elasticsearch 6.5 Example
=================================

This example exists to test this plugin's implementation of Platform.sh's `elasticsearch:6.5` service.

* [`elasticsearch:6.5`](https://docs.platform.sh/configuration/services/elasticsearch.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshelasticsearch65 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshelasticsearch65_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshelasticsearch65 | grep docker.registry.platform.sh/elasticsearch-6.5 | grep landoplatformshelasticsearch65_searchelastic_1

# Should be running all application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in all application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all elasticsearch containers as elasticsearch
lando ssh -s searchelastic -c "id" | grep elasticsearch

# Should be running the correct elasticsearch versions
lando ssh -s searchelastic -c "curl -XGET 'http://localhost:9200'" | grep 6.5

# Should be able to connect to elasticsearch from the application containers
lando ssh -s app -c "curl localhost/esearch.php" | grep "Barbara Liskov"

# Should be running the correct elasticsearch versions (plugin service)
lando ssh -s searchelastic-plugin -c "curl -XGET 'http://localhost:9200'" | grep 6.5
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
