const Routes = require('./routes');
module.exports = function(app, db, request) {
    Routes(app, db, request);
    // Other route groups could go here, in the future
};