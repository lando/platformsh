Platform.sh MariaDB Example
===========================

This example exists to test this plugin's implementation of Platform.sh's `mariadb` service.

* [Platform.sh MariaDB](https://docs.platform.sh/configuration/services/mysql.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshmysql | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshmysql_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshmysql | grep docker.registry.platform.sh/mariadb-10.2 | grep landoplatformshmysql_mariadb_1

# Should be running all application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in all application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all mariadb containers as app
lando ssh -s mariadb -c "id" | grep app

# Should be running the correct mariadb versions
lando ssh -s mariadb -c "mysql -V" | grep 10.2.

# Should be able to connect to all mariadb relationships
lando mariadb main -e "show tables;"

# Should be able to connect to mysql from the application containers
lando ssh -s app -c "curl -I localhost/mysql.php" | grep HTTP/1.1 | grep "200 OK"
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
