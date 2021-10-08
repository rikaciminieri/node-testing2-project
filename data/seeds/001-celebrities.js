const celebrities = [
  { celebrity_name: "Ariana Grande", celebrity_rating: 10 },
  { celebrity_name: "Kanye West", celebrity_rating: 2 },
  { celebrity_name: "Billie Eilish", celebrity_rating: 10 },
  { celebrity_name: "Kim Kardashian", celebrity_rating: 6 },
  { celebrity_name: "Drake", celebrity_rating: 8 },
];

exports.seed = function (knex, Promise) {
  return knex("celebrities")
    .truncate()
    .then(function () {
      return knex("celebrities").insert(celebrities);
    });
};
