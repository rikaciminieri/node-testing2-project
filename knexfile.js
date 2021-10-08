// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    migrations: {
      directory: "./data/migrations"
    },
    seed: {
      directory: "./data/seeds"
    },
    connection: {
      filename: './data/celebrities.db3'
    },
    useNullAsDefault: true,
  },
};
