const users = [];
let nextId = 1;

module.exports = { users, getNextId: () => nextId++ };