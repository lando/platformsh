# Platform.sh Lando Plugin

**Warning: This plugin is currently unsupported! If your team is interested in sponsoring the integration, [contact us](https://docs.lando.dev/platformsh/support.html)!**

This is the _official_ [Lando](https://lando.dev) plugin for [Platform.sh](https://platform.sh). When installed it...

* Allows users to spin up their Platform.sh projects for development with Lando
* Allows users to sync database relationships and mounts between Platform.sh and Lando
* Uses Platform.sh's own images for extremely close parity with production
* Uses Platform.sh's own configuration files to determine what Lando should run and do
* Provides users with relevant and containerized tooling commands

Of course, once a user is running their Platform.sh project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.


## Basic Usage

Clone a project down from Platform.sh.

```bash
# Make and go into an empty directory
mkdir myproject && cd myproject

# Clone down code from Platform.sh
lando init --source

# Start the project up
lando start

# Pull down relationships and mounts
lando pull
```

Once your project is running you can access [relevant tooling commands](https://github.com/lando/platformsh/blob/main/docs/usage.md#application-tooling).

```bash
# Run platform cli commands
lando platform auth:info

# Note that mysql is the name of a relationship defined in .platform.yaml
# Access relationships directly
lando mysql main -e "show tables;"
# Manually importing a database
lando mysql main < dump.sql
```

You can also [override Platform.sh configuarion](https://github.com/lando/platformsh/blob/main/docs/usage.md#overriding-config) in your Landofile with things that make more sense for development.

```yaml
name: platformsh-drupal8
recipe: platformsh
config:
  id: PROJECTID
  overrides:
    app:
      variables:
        env:
          APP_ENV: dev
        d8settings:
          skip_permissions_hardening: 1
    db:
      configuration:
        properties:
          max_allowed_packet: 63
```

For more info you should check out the [docs](https://docs.lando.dev/platformsh):

* [Getting Started](https://docs.lando.dev/platformsh/getting-started.html)
* [Configuration](https://docs.lando.dev/platformsh/config.html)
* [Tooling](https://docs.lando.dev/platformsh/tooling.html)
* [Syncing](https://docs.lando.dev/platformsh/syncing.html)
* [Caveats](https://docs.lando.dev/platformsh/caveats.html)
* [Guides](https://docs.lando.dev/platformsh/adding-more-tooling.html)
* [Examples](https://github.com/lando/platformsh/tree/main/examples)
* [Development](https://docs.lando.dev/platformsh/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/platformsh/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/platformsh/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/platformsh/releases).

## Development

If you're interested in working on this plugin then we recommend you check out the [development guide](https://github.com/lando/platformsh/blob/main/docs/development.md).

## Contributors

<a href="https://github.com/lando/platformsh/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/platformsh" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/platformsh/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)
