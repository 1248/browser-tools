Browser Tools
=============

This repository is a collection of browser-based tools and tests for working with the IoT catalogue format known by the MIME type "application/vnd.tsbiot.catalogue+json".

The tools are web applications, written with node.js, using javascript and HTML in the browser.
They may be run on a public server, or locally on a PC, but are always accessed through a browser.

Contents
--------

 * server/ a web server + HTTP proxy serving:
   * server/htdocs/crawler.html a browser-based catalogue crawler and knowledge graph viewer
   * server/htdocs/explorer.html an interactive browser-based catalogue explorer and knowledge graph viewer
   * server/htdocs/map.html a browser-based catalogue mapping demo
   * server/htdocs/browser.html a browser-based catalogue text browser demo
   * server/htdocs/validator.html a fully browser side catalogue syntax checker

Run the server
--------------

    npm install
    npm start

Browse to a client
------------------

Visit http://localhost:8000/


Why do I need to run the server?
--------------------------------

Almost all of the application code is client-side. The server provides an HTTP proxy (relays GET requests to /fetch?url=, POST requests on /post?url= and DELETE requests on /del?url=) to work around the cross-domain constraints of Javascript requests.


