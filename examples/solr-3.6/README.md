Platform.sh Solr 3.6 Example
============================

This example exists to test this plugin's implementation of Platform.sh's `solr:3.6` service.

* [`solr:3.6`](https://docs.platform.sh/configuration/services/solr.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshsolr36 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshsolr36_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshsolr36 | grep docker.registry.platform.sh/solr-3.6 | grep landoplatformshsolr36_search_1
docker ps --filter label=com.docker.compose.project=landoplatformshsolr36 | grep docker.registry.platform.sh/solr-3.6 | grep landoplatformshsolr36_customcore_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all solr containers as app
lando ssh -s search -c "id" | grep app
lando ssh -s customcore -c "id" | grep app

# Should be running the correct solr versions
lando ssh -s search -c "curl localhost:8080/solr/admin/info/system?wt=json" | grep solr-spec-version | grep "3.6"
lando ssh -s customcore -c "curl localhost:8080/solr/admin/info/system?wt=json" | grep solr-spec-version | grep "3.6"

# Should be able to connect to all solr cores
lando ssh -s search -c "curl localhost:8080/solr/collection1/admin/ping?wt=json" | grep status | grep OK
lando ssh -s search -c "curl localhost:8080/solr/admin/ping?wt=json" | grep status | grep OK
lando ssh -s customcore -c "curl localhost:8080/solr/collection1/admin/ping?wt=json" | grep status | grep OK
lando ssh -s customcore -c "curl localhost:8080/admin/collection1/admin/ping?wt=json" | grep status | grep OK

# Should be able to connect to solr core relationships from application containers
lando ssh -s app -c "curl localhost/search.php" | grep "It worked"
lando ssh -s app -c "curl localhost/custom.php" | grep "It worked"
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
