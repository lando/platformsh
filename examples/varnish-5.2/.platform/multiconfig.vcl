vcl 4.0;

import cookie;
import header;
import saintmode;
# import softpurge;
import tcp;
import var;
import vsthrottle;
import xkey;

sub vcl_recv {
  if (req.url ~ "^/test/") {
    set req.backend_hint = other.backend();
  } else {
    set req.backend_hint = everything.backend();
  }
}
