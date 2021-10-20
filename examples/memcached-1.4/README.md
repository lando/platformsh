Platform.sh Memcached 1.4 Example
=================================

This example exists to test this plugin's implementation of Platform.sh's `memcached:1.4` service.

* [`memcached:1.4`](https://docs.platform.sh/configuration/services/memcached.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshmemcached14 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshmemcached14_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshmemcached14 | grep docker.registry.platform.sh/memcached-1.4 | grep landoplatformshmemcached14_cache_1

# Should be running all application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in all application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should have the memcached php extension installed
lando php -m | grep memcached

# Should be running all memcached containers as app
lando ssh -s cache -c "id" | grep app

# Should be running the correct memcached versions
lando ssh -s cache -c "memcached -V" | grep 1.4

# Should be running memcached on the correct port
docker top landoplatformshmemcached14_cache_1 | grep /usr/bin/memcached | grep 11211

# Should be able to connect to memcached from the application containers
lando ssh -s app -c "curl localhost/cache.php" | grep Friday | grep "Deploy day"
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
