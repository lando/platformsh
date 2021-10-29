Platform.sh PHP 5.5 Example
===========================

This example exists to test this plugin's implementation of Platform.sh's `php:5.5` service.

* [`php:5.5`](https://docs.platform.sh/configuration/services/php.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshphp55 | grep docker.registry.platform.sh/php-5.5 | grep landoplatformshphp55_vanilla_1
docker ps --filter label=com.docker.compose.project=landoplatformshphp55 | grep docker.registry.platform.sh/php-5.5 | grep landoplatformshphp55_advanced_1

# Should be running application containers as web
lando ssh -s vanilla -c "id" | grep web
lando ssh -s advanced -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s vanilla -c "platform -V"
lando ssh -s advanced -c "platform -V"

# Should be running the correct php version
lando ssh -s vanilla -c "php --version" | grep 5.5.
lando ssh -s advanced -c "php --version" | grep 5.5.

# Should serve php files
lando ssh -s vanilla -c "curl localhost:80" | grep  "PHP Version 5.5."
lando ssh -s advanced -c "curl localhost:80" | grep  "PHP Version 5.5."

# Should have the correct version of composer
# lando ssh -s vanilla -c "composer --version --no-ansi" | grep "Composer 1."
lando ssh -s advanced -c "composer --version --no-ansi" | grep "Composer 2."

# Should prefer deps installed in application yamls
# lando ssh -s vanilla -c "which composer" | grep "/usr/local/bin/composer"
lando ssh -s advanced -c "which composer" | grep "/app/.platform/local/deps/php/vendor/bin/composer"

# Should have the correct extensions installed
lando ssh -s vanilla -c "php -m" | grep redis || echo "$?" | grep 1
lando ssh -s advanced -c "php -m" | grep redis

# Should run build hooks
lando ssh -s advanced -c "stat /tmp/build"

# Should run deploy hooks
lando ssh -s advanced -c "stat /tmp/deploy"
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
