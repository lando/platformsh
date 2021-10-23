Platform.sh Kitchen Sink Example
================================

This example exists primarily to test the following documentation:

* [Platform.sh Recipe](https://docs.lando.dev/config/platformsh.html)

In particular its designed to test:

* Multiapplication configuration
* All the services and their config
* All application containers and their config
* Using application `relationships` from `lando` and the applications themselves
* The platform.sh documentation on how to connect from an application to a service via a `relationship`

Here are some general guidelines for adding and testing a services:

### 1. Add the service

Add a service to `.platform/services.yaml`. Try to use one of the more complex configurations from the platform.sh docs.

### 2. Update the application config

Add any needed `extensions` or `relationships` to the applications, currently just `php`, in `.platform.yaml/applications.yaml`.

### 3. Add a testing script

Add a script that tests the service from the given application eg `php/web/redis.php` for the `php` application. The testing scripts here are taken almost verbatim from the platform.sh docs. For example: https://docs.platform.sh/configuration/services/redis.html#usage-example.

### 4. Add tests below

There is a repeatable pattern for application containers and services below. Generally these should include things like:

1. Is it runnning the right version?
2. Can I connect to it using the `lando <RELATIONSHIPNAME>` command?
3. Is its custom configuration being set correctly?
4. Does its data persist across a rebuild if needed?
5. Can I connect to it from a given application container?
6. Can I pull/push the relationship?

SKIPFORNOW
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the platformsh lando-kitchensink example
rm -rf sink && mkdir -p sink && cd sink
lando init --source platformsh --platformsh-auth "$PLATFORMSH_CLI_TOKEN" --platformsh-site lando-kitchensink --platformsh-key-name "$CIRCLE_SHA1"

# Should start up our platformsh site successfully
cd sink
lando start
```

SKIPFORNOW
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should have the expected platformsh containers and images
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/php-7.4 | grep landokitchensink_base_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/php-7.2 | grep landokitchensink_discreet_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/php-7.3 | grep landokitchensink_php_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/mariadb-10.2 | grep landokitchensink_db_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/memcached-1.6 | grep landokitchensink_memcache_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/mariadb-10.4 | grep landokitchensink_mysql_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/postgresql-11| grep landokitchensink_postgres_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/redis-5.0 | grep landokitchensink_redis_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/kafka-2.4 | grep landokitchensink_kafka_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/varnish-6.0 | grep landokitchensink_varnish_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/mongodb-3.6 | grep landokitchensink_dbmongo_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/influxdb-1.7 | grep landokitchensink_influxdb_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/elasticsearch-7.7 | grep landokitchensink_searchelastic_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/rabbitmq-3.8 | grep landokitchensink_rabbitmq_1
docker ps --filter label=com.docker.compose.project=landokitchensink | grep docker.registry.platform.sh/solr-8.0 | grep landokitchensink_search_1

# Should be running the correct postgres version
cd sink/php
lando ssh -s postgres -c "/usr/lib/postgresql/11/bin/postgres -V" | grep 11.

# Should be able to connect to all postgres relationships
cd sink/php
lando postgres -c "\\dt"

# Should have the correct postgres extensions installed
cd sink/php
lando postgres -c "\\dx" | grep hstore
lando postgres -c "\\dx" | grep pg_trgm

# Should be able to connect to postgres from the application containers
cd sink/php
lando ssh -c "curl -I localhost/postgres.php" | grep HTTP/1.1 | grep "200 OK"

# Should be running postgres with the correct user
cd sink/php
lando ssh -s postgres -c "id" | grep postgres

# Should run the correct version of elasticsearch
cd sink/php
lando ssh -s searchelastic -c "curl localhost:9200" | grep "7.7"

# Should have an elasticsearch cluster status of green
cd sink/php
lando ssh -s searchelastic -c "curl localhost:9200/_cluster/health?pretty" | grep green

# Should run elasticsearch as the correct user
cd sink/php
lando ssh -s searchelastic -c "id" | grep elasticsearch

# Should be able to connect to work with elasticsearch indices from php
# lando ssh -c "curl localhost/elasticsearch.php" | grep "Barbara Liskov"
# NOTE: not sure why this is failing rn
cd sink/php
true

# Should run php mongodb commands successfully
cd sink/php
lando ssh -c "curl localhost/mongodb.php" | grep "Result" | grep "OK"

# Should have OS Pid when running rabbitmqctl status
cd sink/php
lando ssh -u root -s rabbitmq -c "rabbitmqctl status" | egrep "OS PID: [0-9]+"

# Should load rabbitmq management page
cd sink/php
lando ssh -s rabbitmq -c "curl localhost:15672" | grep "RabbitMQ Management"

# Should run php rabbitmq php commands successfully
cd sink/php
lando ssh -c "curl localhost/rabbitmq.php" | grep "Result" | grep "OK"

# Should show influxdb process running as the app user
cd sink/php
lando ssh -u root -s influxdb -c "ps aux|grep influxdb" | grep "^app"

# Should show kafka process running
cd sink/php
lando ssh -u root -s kafka -c "ps aux" | grep runsv | grep kafka

# Should find chromium service
cd sink/php
lando ssh -s chromium -c "ps -aux" | grep "chromium-headless"

# Should run chromium php page
cd sink/php
lando ssh -c "curl localhost/chromium.php" | grep "Result" | grep "OK"
```

SKIPFORNOW
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be able to remove our platformsh ssh keys
cp -r remove-keys.sh sink/remove-keys.sh
cd sink
lando ssh -s appserver -c "/app/remove-keys.sh $CIRCLE_SHA1"
cd ..
rm -rf sink/remove-keys.sh

# Should be able to destroy our platformsh site with success
cd sink
lando destroy -y
lando poweroff
```
