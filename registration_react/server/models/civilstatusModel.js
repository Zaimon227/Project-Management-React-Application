const { Model} = require('objection');

class CivilStatus extends Model {
    static get tableName() {
        return 'tbCivilStatus';
    }
}

module.exports = CivilStatus;