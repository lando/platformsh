Platform.sh Solr 7.6 Example
============================

This example exists to test this plugin's implementation of Platform.sh's `solr:7.6` service.

* [`solr:7.6`](https://docs.platform.sh/configuration/services/solr.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshsolr76 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshsolr76_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshsolr76 | grep docker.registry.platform.sh/solr-7.6 | grep landoplatformshsolr76_search_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all solr containers as app
lando ssh -s search -c "id" | grep app
lando ssh -s multicore -c "id" | grep app
lando ssh -s configset -c "id" | grep app

# Should be running the correct solr versions
lando ssh -s search -c "curl localhost:8080/solr/admin/info/system?wt=json" | grep solr-spec-version | grep "7.6"
lando ssh -s multicore -c "curl localhost:8080/solr/admin/info/system?wt=json" | grep solr-spec-version | grep "7.6"
lando ssh -s configset -c "curl localhost:8080/solr/admin/info/system?wt=json" | grep solr-spec-version | grep "7.6"

# Should be able to connect to all solr cores
lando ssh -s search -c "curl localhost:8080/solr/collection1/admin/ping?wt=json" | grep status | grep OK
lando ssh -s multicore -c "curl localhost:8080/solr/mainindex/admin/ping?wt=json" | grep status | grep OK
lando ssh -s multicore -c "curl localhost:8080/solr/extraindex/admin/ping?wt=json" | grep status | grep OK
lando ssh -s configset -c "curl localhost:8080/solr/english_index/admin/ping?wt=json" | grep status | grep OK
lando ssh -s configset -c "curl localhost:8080/solr/arabic_index/admin/ping?wt=json" | grep status | grep OK

# Should be able to connect to solr core relationships from application containers
lando ssh -s app -c "curl localhost/search.php" | grep "It worked"
lando ssh -s app -c "curl localhost/main.php" | grep "It worked"
lando ssh -s app -c "curl localhost/extra.php" | grep "It worked"
lando ssh -s app -c "curl localhost/english.php" | grep "It worked"
lando ssh -s app -c "curl localhost/arabic.php" | grep "It worked"
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
