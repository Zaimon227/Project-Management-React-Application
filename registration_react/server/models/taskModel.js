const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'tbTasks';
    }
    static get idColumn() {
        return 'taskid';
    }
    $beforeInsert() {
        this.start = new Date().toISOString();
    }
}

module.exports = Task;