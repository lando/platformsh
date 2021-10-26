Platform.sh PostgreSQL 11 Example
================================

This example exists to test this plugin's implementation of Platform.sh's `postgresql:11` service.

* [Platform.sh PostgreSQL 11](https://docs.platform.sh/configuration/services/postgresql.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshpostgresql11 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshpostgresql11_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshpostgresql11 | grep docker.registry.platform.sh/postgresql-11 | grep landoplatformshpostgresql11_postgresql_1

# Should be running all application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in all application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all postgresql containers as postgres
lando ssh -s postgresql -c "id" | grep postgres

# Should be running the correct postgresql versions
lando ssh -s postgresql -c "psql -V" | grep 11.

# Should be able to connect to all postgresql relationships
lando postgresql main -c "\dt"

# Should be able to connect to postgresql from the application containers
lando ssh -s app -c "curl -I localhost/postgresql.php" | grep HTTP/1.1 | grep "200 OK"
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
