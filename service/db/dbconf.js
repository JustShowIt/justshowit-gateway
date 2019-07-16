module.exports = {
    define(db, models, next) {
        models.test = db.define('test', {
            id: Number,
            text: String
        });
        next();
    }
}