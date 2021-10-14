# Development Guide

This guide contains information to help onboard developers to work on the [Platform.sh](https://platform.sh) integration, hereafter referred to as "the plugin".

## Requirements

At the very least you will need to have the following installed:

* [Lando 3.5.0+](https://docs.lando.dev/basics/installation.html), preferably installed [from source](https://docs.lando.dev/basics/installation.html#from-source).
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

While not a hard requirement it's also probably a good idea to install both `node` 14 and `yarn`

* [Node 14](https://nodejs.org/dist/latest-v14.x/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Installation

```bash
# Clone this repo
git clone https://github.com/lando/platformsh.git && cd platformsh

# Install dependencies with lando
lando start

# Or install them with yarn
yarn
```

## Working

This plugin contains various working and tested Lando apps in the [examples](https://github.com/lando/platformsh/tree/main/examples) folder. You should use these or create new ones to help with plugin development.

Note that each one of these examples contains the following section in its Landofile.

```yaml
plugins:
  "@lando/platformsh": ./../../
```

This tells Lando that _this_ app should use the source version of the `@lando/platformsh` plugin you cloned down in the installation. This is useful because it allows you to isolate development within this repo without interferring with any other apps using the stable and global version of the plugin.

This means that you should _almost always_ develop against apps in the `examples` folder and that those apps should _always_ contain the above `plugins` config.

Whether you are working off an existing example or a new one you should make sure that you are updating or adding new tests as you go. See [leia testing](#leia-tests) below for more detail.

## Project Structure

This plugin follows the same structure as any [Lando plugin](https://docs.lando.dev/contrib/contrib-plugins.html#plugins) but here is an explicit breakdown:

```bash
./
|-- lib             Utilities and helpers, things that can easily be unit tested
|-- recipes
    |-- platformsh  The files to define the `platformsh` recipe and its `init` command
|-- scripts         Helpers scripts that end up /helpers/ inside each container
|-- services        Defines each platform.sh service eg `redis` or `php`
|-- test            Unit tests
|-- types           Defines the type/parent each above service can be
|-- app.js          Modifications to the app runtime
|-- index.js        Modifications to the Lando runtime
```

## Important things

Here are some things that deviate from Lando-normal that you should be aware of.

### Container lifecycle

Platform.sh uses a more complex container lifecycle than Lando. That lifecycle is detailed [here](https://github.com/lando/platformsh/blob/main/docs/lifecycle.md).

### Runtime configuration

Most of the Platform.sh magic comes from a configuration file located in every service at `/run/config.json`. Lando generates and injects this file into each container.

It is constructed by combining the Platform.sh configuration files eg `.platform.app.yaml`, `services.yaml` etc and some extra things.

### Services and Types

Inside of the `services` folder you will see where we define the Lando service that corresponds to each platform application container and service. Each service can either be a `platform-appserver` or a `plaform-service` and each of these are defined in the `types` folder.

A `platform-appserver` means it is an applicaton container eg a supported Platform.sh "langauge" eg a `type` you can define in a `.platform.app.yaml` file.

A `platform-service` means it something that goes in the `services.yaml`

If you want to add support for a new platform service or application container simply add a new one into the `services` folder and make sure you set the `parent` to either `_platformsh_service` or `_platformsh_appserver` as appropriate.

Also note that you will likely need to add it to `getLandoServiceType` which maps a `platform` `type `to a `lando` `type`.
https://github.com/lando/lando/blob/abf0648701b960e49f09bf9e569c83aca727666a/experimental/plugins/lando-platformsh/lib/services.js#L8

### SSH

In `index.js` you will see that `lando` is overriding the core `lando ssh` command. This serves two main purposes:

1. To select the default `service` to run on. The default service will be set to the closest `.platform.app.yaml` Lando can find. The `name`of the application in that file is also the name of the service.
2. To make sure all `lando ssh` commands are prefixed with `/helpers/psh-exec.sh`

`/helpers/psh-exec.sh` is a helper script that makes sure the user environment is set correctly before commands are run. Primarily this makes sure that `$HOME` is not set to `/app` and that the `PLATFORM_` variables are set before the command is run.

### Application tooling

Similarly in `index.js` all tooling commands are prefixed by `/helpers/psh-exec.sh`.

### Troubleshooting Python Source in Platform.sh Containers

When viewing container logs, you may see references to python files like `config.py`.

You will find the python source code in the following directories:
- `/etc/platform`
- `/usr/lib/python2.7/dist-packages/platformsh`

### Known issues and caveats

We recommend reviewing the [known issues and caveats](https://github.com/lando/platformsh/blob/main/docs/usage.md#caveats-and-known-issues) in the usage documentation.

## Testing

It's best to familiarize yourself with how Lando [does testing](https://docs.lando.dev/contrib/contrib-testing.html) in general before proceeding.

### Unit Tests

Generally, unit testable code should be placed in `lib` and then the associated test in `tests` in the form `FILE-BEING-TESTED.spec.js`. Here is an example:

```bash
./
|-- lib
    |-- stuff.js
|-- test
    |-- stuff.spec.js
```

And then you can run the tests with the below.

```bash
# Run unit tests
yarn test:unit
```

### Leia Tests

We do end to end testing with our made-just-for-Lando testing framework [Leia](https://github.com/lando/leia). Leia allows us to define tests as a series of commented shell commands in human readable markdown files. Here is a simple example:

```md
Start up tests
--------------

# Should start up successfully
lando start

Verification commands
---------------------

# Should be able to connect to all mariadb relationships
lando mariadb main -e "show tables;"

Destroy tests
-------------

# Should be able to destroy our app
lando destroy -y
```

Note that the headers here are important and are defined in our `yarn generate:tests` script. The "Start up tests" header specifies things that should run before the main series of tests. "Verification commands" is the main body of tests and is required. "Destroy tests" specifies any needed clean up commands to run.

If you check out the various READMEs in our [examples](https://github.com/lando/platformsh/tree/main/examples) you will notice that they are all Leia tests.

Before running all or some of the tests you will need to generate them.

```bash
# Generate tests
yarn generate:tests

# Run ALL the tests, this will likely take a long time
yarn test:leia

# Run the tests for a single example
yarn mocha --timeout 900000 test/platform-sh-maria-db-10-2-example.leia.js
```

If you've created new testable examples then you will also need to let GitHub Actions know so they can run on pull requests.

To do that you will either want to add the tests to an existing workflow that makes sense or create a new workflow. If you are creating a new workflow you should just copy an existing one and modify the filename and `name` key to something that makes sense.

To add the new tests to the workflow just modify `jobs.leia-tests.strategy.matrix.leia-tests` with the new tests.

```yaml
jobs:
  leia-tests:
    strategy:
      matrix:
        leia-tests:
            # This should be the filename, without .leia.js extension in the test directory
            # NOTE that you will need to run yarn generate:tests to see these
          - test: platform-sh-maria-db-10-1-example
            # This should be the directory that the test was generated from
            source: examples/mariadb-10.2
          - test: platform-sh-maria-db-10-2-example
            source: examples/mariadb-10.2
```

Now open a pull request and the new tests should run!

For a deeper dive on Leia you can go [here](https://github.com/lando/leia).

## Contribution

If you want to contribute code then just follow [this flow](https://guides.github.com/introduction/flow/).
