var facts = [];

function log(msg) {
    var log = $('#log');
    log.append(msg + "<br/>\n");
    log.scrollTo('100%');
}


function populateExamples() {
    $("#examples").append(new Option("Select example URL", ""));

    $.ajax({
        type: 'GET',
        url: '/listexamples',
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            for (var i=0;i<body.length;i++)
                $("#examples").append(new Option(body[i], body[i]));
        },
        error: function() {
            log("Error listing examples");
        }
    });
}

function fetch(url, cb) {
    log('-> GET ' + url);
    $.ajax({
        type: 'GET',
        url: '/fetch?url='+encodeURI(url),
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            log('<- ' + xhr.status + ' ' + xhr.statusText);
            cb(null, body);
        },
        error: function() {
            log("Error fetching "+url);
        }
    });
}

function storeFact(o) {
    // only store unique facts (FIXME, slow)
    for (var i=0;i<facts.length;i++) {
        if (facts[i].subject == o.subject &&
            facts[i].predicate == o.predicate &&
            facts[i].object == o.object)
                return;
    }
    facts.push(o);
}

