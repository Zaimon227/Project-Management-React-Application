const { Model} = require('objection');

class Religion extends Model {
    static get tableName() {
        return 'tbReligion';
    }
}

module.exports = Religion;