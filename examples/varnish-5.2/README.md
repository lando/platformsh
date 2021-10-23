Platform.sh Varnish 5.2 Example
===============================

This example exists to test this plugin's implementation of Platform.sh's `varnish:5.2` service.

* [`varnish-persistent:5.2`](https://docs.platform.sh/configuration/services/varnish.html)
* [`varnish:5.2`](https://docs.platform.sh/configuration/services/varnish.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshvarnish52 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshvarnish52_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshvarnish52 | grep docker.registry.platform.sh/varnish-5.2 | grep landoplatformshvarnish52_edge_1
docker ps --filter label=com.docker.compose.project=landoplatformshvarnish52 | grep docker.registry.platform.sh/varnish-5.2 | grep landoplatformshvarnish52_multiedge_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web
lando ssh -s other -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"
lando ssh -s other -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.
lando ssh -s other -c "php --version" | grep 7.3.

# Should be running all varnish containers as app
lando ssh -s edge -c "id" | grep www-data
lando ssh -s multiedge -c "id" | grep www-data

# Should be running the correct varnish versions
lando ssh -s edge -c "varnishd -V 2>&1" | grep varnishd | grep varnish | grep "5.2."
lando ssh -s multiedge -c "varnishd -V 2>&1" | grep varnishd | grep varnish | grep "5.2."

# Should be able to connect to all varnish relationships
lando ssh -s app -c "curl http://lando-platformsh-varnish-5.2.lndo.site/" | grep HELLO
lando ssh -s app -c "curl http://multi.lando-platformsh-varnish-5.2.lndo.site/" | grep HELLO
lando ssh -s app -c "curl http://multi.lando-platformsh-varnish-5.2.lndo.site/other" | grep HELLO

# Should be able to connect to the correct backends
lando ssh -s edge -c "curl localhost:8080" | grep HELLO
lando ssh -s multiedge -c "curl localhost:8080" | grep HELLO
lando ssh -s multiedge -c "curl localhost:8080/test/thing" | grep GOODBYE

# Should set the correct VCL things
lando ssh -s edge -c "curl localhost:8081/config" | grep backend | grep main_1
lando ssh -s multiedge -c "curl localhost:8081/config" | grep backend | grep everything_1
lando ssh -s multiedge -c "curl localhost:8081/config" | grep backend | grep other_1

# Should be able to connect to the varnish admin pages
lando ssh -s edge -c "curl localhost:8081/config"
lando ssh -s edge -c "curl localhost:8081/stats"
lando ssh -s multiedge -c "curl localhost:8081/config"
lando ssh -s multiedge -c "curl localhost:8081/stats"
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
