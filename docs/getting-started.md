---
description: Learn how to get started with the Lando Platform.sh recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/)
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/core/v3/lando-service.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

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

