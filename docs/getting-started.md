---
description: Learn how to get started with the Lando Platform.sh recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/)
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

You can also run the following commands to try out this recipe on one of your Platform.sh sites.

```bash
# Go through interactive prompts to get your site from platformsh
lando init --source platformsh

# OR do it non-interactively
# NOTE: You will want to make sure you set $PLATFORMSH_CLI_TOKEN
# and $PLATFORMSH_SITE_NAME to values that make sense for you
lando init \
  --source platformsh \
  --platformsh-auth "$PLATFORMSH_CLI_TOKEN" \
  --platformsh-site "$PLATFORMSH_SITE_NAME"


# OR if you already have your platform code locally
cd /path/to/repo
lando init \
  --source cwd \
  --recipe platformsh

# Start it up
lando start

# Import any relevant relationships or mounts
# NOTE: You will likely need to change the below to specify
# relationships and mounts that make sense for your application
# See further below for more information about lando pull
lando pull -r database -m web/sites/default/files

# List information about this app.
lando info
```

**Note that if your `platformsh` project requires environment variables set in the [Platform Management Console](https://docs.platform.sh/administration/web/configure-environment.html) you will need to set those manually!**

See the [Environment Variables](./config.md#environment-variables) section for details.

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/platformsh" line to install a particular version eg
# npm install @lando/platform@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "npm init -y \
  && npm install @lando/platformsh --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/platformsh \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/platformsh /plugins/@lando/platformsh"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/platformsh
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/platformsh`. This command will also show you _where_ the plugin is being loaded from.
