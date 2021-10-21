Platform.sh Redis 3.2 Example
=============================

This example exists to test this plugin's implementation of Platform.sh's `redis:3.2` service.

* [`redis-persistent:3.2`](https://docs.platform.sh/configuration/services/redis.html)
* [`redis:3.2`](https://docs.platform.sh/configuration/services/redis.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshredis32 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshredis32_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshredis32 | grep docker.registry.platform.sh/redis-3.2 | grep landoplatformshredis32_cache_1
docker ps --filter label=com.docker.compose.project=landoplatformshredis32 | grep docker.registry.platform.sh/redis-3.2 | grep landoplatformshredis32_configuredcache_1
docker ps --filter label=com.docker.compose.project=landoplatformshredis32 | grep docker.registry.platform.sh/redis-persistent-3.2 | grep landoplatformshredis32_database_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all redis containers as app
lando ssh -s cache -c "id" | grep app
lando ssh -s configuredcache -c "id" | grep app
lando ssh -s database -c "id" | grep app

# Should be running the correct redis versions
lando ssh -s cache -c "redis-server --version" | grep v=3.2.
lando ssh -s configuredcache -c "redis-server --version" | grep v=3.2.
lando ssh -s database -c "redis-server --version" | grep v=3.2.

# Should be able to connect to all redis relationships
lando cache ping
lando configuredcache ping
lando database ping

# Should have set custom configuration
lando ssh -s configuredcache -c "cat /etc/redis/redis.conf" | grep maxmemory-policy | grep noeviction

# Should have the redis php extension installed
lando php -m | grep redis

# Should be able to connect to redis from application containers
lando ssh -s app -c "curl localhost/cache.php" | grep Friday | grep "Deploy day"
lando ssh -s app -c "curl localhost/configuredcache.php" | grep Friday | grep "Deploy day"
lando ssh -s app -c "curl localhost/database.php" | grep Friday | grep "Deploy day"

# Should persist data correctly or not
lando rebuild -y
lando configuredcache get "Deploy day" | grep Friday || echo "$?" | grep 1 || true
lando configuredcache get "Deploy day" | grep Friday || echo "$?" | grep 1 || true
lando database get "Deploy day" | grep Friday
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
