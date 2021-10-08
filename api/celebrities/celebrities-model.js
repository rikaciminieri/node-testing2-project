const db = require("../../data/db-config")

function getAll() {
    return db("celebrities")
}

function getById(id) {
    return db("celebrities").where("celebrity_id", id).first()
}

async function insert(celebrity) {
    return db("celebrities").insert(celebrity)
    .then(([id]) => {
        return getById(id)
    })
}

function remove(id) {
    return db("celebrities").where("celebrity_id", id).del()
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}