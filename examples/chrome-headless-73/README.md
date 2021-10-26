Platform.sh Headless Chrome 73 Example
======================================

This example exists to test this plugin's implementation of Platform.sh's `chrome-headless:73` service.

* [`chrome-headless:73`](https://docs.platform.sh/configuration/services/headless-chrome.html)

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
docker ps --filter label=com.docker.compose.project=landoplatformshchromeheadless73 | grep docker.registry.platform.sh/php-7.3 | grep landoplatformshchromeheadless73_app_1
docker ps --filter label=com.docker.compose.project=landoplatformshchromeheadless73 | grep docker.registry.platform.sh/chrome-headless-73 | grep landoplatformshchromeheadless73_headlessbrowser_1

# Should be running application containers as web
lando ssh -s app -c "id" | grep web

# Should have the platform cli in application containers
lando ssh -s app -c "platform -V"

# Should be running the correct php version
lando ssh -s app -c "php --version" | grep 7.3.

# Should be running all chrome-headless containers as www-data
lando ssh -s headlessbrowser -c "id" | grep "www-data"

# Should be running the correct chrome-headless versions
lando ssh -s app -c "curl localhost/version.php" | grep "Result" | grep "HeadlessChrome/75.0"

# Should be able to connect to chrome-headless from application containers
lando ssh -s app -c "curl localhost/chrome.php" | grep "Result" | grep "OK"

# Should be able to access the chrome webui
lando ssh -s headlessbrowser -c "curl localhost:9222" | grep "Inspectable WebContents"
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
