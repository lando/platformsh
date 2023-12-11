---
title: Platform.sh Lando Plugin
description: The best local development environment option for Platform.sh, the fastest way to build modern web apps.
next: ./getting-started.html
---

# Platform.sh

[Platform.sh](https://platform.sh/) is the end-to-end web platform for agile teams. With it you can build, evolve, and scale your website fleet—with zero infrastructure management investment. Get hosting, CI/CD, automated updates, global 24x7 support. And much more.

This Lando integration is currently in development and as such it has the following _serious caveats_:

* This should be considered at an `beta` level of readiness
* This has only been tested against Platform.sh's `php` project templates
* This currently _only_ supports Platform.sh's `php` application container
* It's not yet clear how much customization to your project is currently supported

However, if you'd like to try it out and give your feedback on what worked and what didn't then please continue. You can also read about some more caveats [here](./caveats.md).

You can report any issues or feedback [over here](https://github.com/lando/platformsh/issues/new/choose) or check out the [support page](./support.md).

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/platformsh
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/platformsh
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/platformsh" line to install a particular version eg
# npm install @lando/platformsh@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:16-alpine sh -c \
  "npm init -y \
  && npm install @lando/platformsh --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/platformsh \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/platformsh /plugins/@lando/platformsh"

# Rebuild the plugin cache
lando --clear
```
:::
::::
