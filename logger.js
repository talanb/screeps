const g = require('./globals');

module.exports = {
    debug: function(module, message) {
        if (g.DEBUG) console.log("[DEBUG] (" + module + ") " + message);
    },
    info: function(module, message) {
        if (g.INFO) console.log("[INFO]  (" + module + ") " + message);
    },
    warning: function(module, message) {
        if (g.WARNING) console.log("[WARN]  (" + module + ") " + message);
    },
    error: function(module, message) {
        if (g.ERROR) console.log("[ERROR] (" + module + ") " + message);
    },
    status: function(module, message) {
        if (g.STATUS) console.log("[STAT]  (" + module + ") " + message);
    }
};