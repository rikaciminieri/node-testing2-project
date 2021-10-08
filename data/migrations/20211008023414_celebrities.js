exports.up = function (knex) {
  return knex.schema.createTable("celebrities", (tbl) => {
    tbl.increments("celebrity_id");
    tbl.string("celebrity_name", 128).unique().notNullable();
    tbl.integer("celebrity_rating").unsigned().notNullable();
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("celebrities")
};
