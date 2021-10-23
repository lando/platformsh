vcl 4.0;

sub vcl_recv {
  set req.backend_hint = main.backend();
}
