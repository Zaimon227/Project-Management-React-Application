const { Model} = require('objection');

class Contact extends Model {
    static get tableName() {
        return 'tbContacts';
    }
}

module.exports = Contact;