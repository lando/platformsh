# Platform.sh Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Platform.sh](https://platform.sh). When installed it...

* Allows users to spin up their Platform.sh projects for development with Lando
* Allows users to sync database relationships and mounts between Platform.sh and Lando
* Uses Platform.sh's own images for extremely close parity with production
* Uses Platform.sh's own configuration files to determine what Lando should run and do
* Provides users with relevant and containerized tooling commands

Of course, once a user is running their Platform.sh project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed! However if you would like to manually install the plugin for whatever reason you can follow the below:

```bash
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add lando/platformsh#main --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/platformsh \
  && mv --force /tmp/node_modules/@lando/platformsh /plugins"

# Rebuild the plugin cache
lando --clear
```

You can verify the plugin is installed with:

 this plugin as it is included with Lando by default.



## Basic Usage

For the

## Development

## Other things?

* Advice
* CHANGELOG
* LICENSE
* examples
* guides
