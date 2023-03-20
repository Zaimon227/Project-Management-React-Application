const { Model} = require('objection');

class Nationality extends Model {
    static get tableName() {
        return 'tbNationality';
    }
}

module.exports = Nationality;