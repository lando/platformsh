---
title: Manually importing databases
description: Learn how to automatically populate guide content using the VuePress 2 Default Theme Plus.
guide: true
---

If you have data that exists outside Platform.sh eg a `dump.sql` file you'd like to import you can leverage the special `lando` commands we give you to access each `relationship`. You will need to make sure that the relationship you connect with has the appropriate permissions needed to import your dump file.

```bash
# Import to the main schema using the database relationships
lando database main < dump.sql
```
