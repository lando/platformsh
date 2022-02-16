---
title: Caveats
description: Learn about caveats and known issues with the Lando Platform.sh recipe.
---

# Caveats and known issues

Since this is a currently an `beta` release there are a few known issues, and workarounds, to be aware of. We also recommend you consult GitHub for other [Platform.sh tagged issues](https://github.com/lando/lando/issues?q=is%3Aopen+is%3Aissue+label%3Aplatformsh
).

We also _highly encourage_ you to [post an issue](https://github.com/lando/lando/issues/new/choose) if you see a problem that doesn't already have an issue.

### `$HOME` considerations

Platform.sh sets `$HOME` to `/app` by default. This makes sense in a read-only hosting context but is problematic for local development since this is also where your `git` repository lives and you probably don't want to accidentally commit your `$HOME/.composer` cache into your repo.

Lando changes this behavior and sets `$HOME` to its own default of `/var/www` for most _user initiated_ commands and automatic build steps.

It also will override any `PLATFORM_VARIABLES` that should be set differently for local dev. For a concrete example of this Platform.sh's Drupal 8 template will set the Drupal `/tmp` directory to `/app/tmp`, Lando will instead set this to `/tmp`.

However, it's _probable_ at this early stage that we have not caught all the places where we need to do both of the above. As a result you probably want to:

#### 1. Look out for caches, configs, or other files that might normally end up in `$HOME`.

Do you due diligence and make sure you `git status` before you `git add`. If you see something that shouldn't be there [let us know](https://github.com/lando/lando/issues/new/choose) and then add it to your `.gitignore` until we have resolved it.


#### 2. Consider LANDO specific configuration

If you notice your application is _not working quite right_ it's possible you need to tweak some of the defaults for your application's configuration so they are set differently on Lando. We recommend you do something like the below snippet.

`settings.local.php`

```php
$platformsh = new \Platformsh\ConfigReader\Config();

if ($config->environment === 'lando') {
  $settings['file_private_path'] = '/tmp';
  $config['system.file']['path']['temporary'] = '/tmp';
}

```

Note that the above is simply meant to be illustrative.

### Redirects

Lando will currently not perform redirects specified in your `routes.yaml`. Instead it will provide separate `http` and `https` routes.

Adding redirect support is being discussed in this ticket: <https://github.com/lando/lando/issues/2509>.

### Local considerations

There are some application settings and configuration that Platform.sh will automatically set if your project is based on one of their boilerplates. While most of these settings are fine for local development, some are not. If these settings need to be altered for your site to work as expected locally then Lando will modify them.

For example if your project is based on the [Drupal 8 Template](https://github.com/platformsh-templates/drupal8) then Lando will set the `tmp` directory and set `skip_permissions_hardening` to `TRUE`.

Lando will likely _not_ do this in the future in favor of a better solution but until then you can check out what we set over [here](https://github.com/lando/lando/blob/master/integrations/lando-platformsh/lib/overrides.js).

### Memory limits

Some services eg Elasticsearch require A LOT of memory to run. Sometimes this memory limit is above the defaults set by Docker Desktop. If you are trying to start an app with memory intensive services and it is hanging try to bump the resources allocated to Docker Desktop and try again. See the below docs:

* [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/#resources)
* [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/#resources)

### Xdebug

You can enable and use xdebug by turning on the extension in your `.platform.app.yaml` and doing a `lando rebuild`.

```yaml
runtime:
  extensions:
    - redis
    - xdebug
```

Due to how Platform.sh sets up `xdebug` it should be ok to have this on even in production. However, if you would like to enable it _only_ on Lando you can override the extensions in your Landofile. Note that the entire array is replaced in the overrides so your Landofile should reflect _all_ the extensions you want to use not just the difference.

```yaml
recipe: platformsh
config:
  id: PROJECT_ID
  overrides:
    app:
      runtime:
        extensions:
          - redis
          - xdebug
```

Lando will also make a best effort attempt to set the correct `xdebug` configuration so that it works "out of the box". If you find that things are not working as expected you can modify the configuration to your liking using the same override mechanisn.


```yaml
config:
  id: PROJECT_ID
  overrides:
    app:
      runtime:
        extensions:
          - redis
          - xdebug
      php:
        # XDEBUG 2
        xdebug.remote_enable: 1
        xdebug.remote_mode: req
        xdebug.remote_port: 9000
        xdebug.remote_connect_back: 0

        # XDEBUG 3
        xdebug.discover_client_host: true
        xdebug.mode: debug
```

### Platformsh.agent errors

When you run `lando start` or `lando rebuild` you may experience either Lando hanging or an error being thrown by something called the `platformsh.agent`. We are attempting to track down the causes of some of these failures but they are generally easy to identify and workaround:

```bash
# Check if a container for your app has exited
docker ps -a

# Inspect the cause of the failure
#
# Change app to whatever you named your application
# in your .platform.app.yaml
lando logs -s app

# Try again
# Running lando start again seems to work around the error
lando start
```

### Persistence across rebuilds

We've currently only verified that data will persist across `lando rebuilds` for the MariaDB/MySQL and PostgreSQL services. It _may_ persist on other services but we have not tested this yet so be careful before you `lando rebuild` on other services.

### Multiapp

If you are using `.platform/applications.yaml` to configure multiple applications and you have two apps with the same `source.root` then Lando will currently use the _first_ application for tooling.

As a workaround you can use `lando ssh` with the `-s` option to access tooling for other applications with that `source.root`.

In the below example, assume there are three `php` applications with the same `source.route`.

```bash
# Go into a directory that has many apps with that same source.route
# See the php version of the first app with source.root at this directory
lando php -v

# Access another app with same source.root
lando -s app2 -c "php -v"
```

### Unsupported things

There are a few things that are currently unsupported at this time, athough we hope to add support in the future.

* Non `php` application containers. [#2368](https://github.com/lando/lando/issues/2368)
* `workers` and the `network_storage` service [#2393](https://github.com/lando/lando/issues/2393)
