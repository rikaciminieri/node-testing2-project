const router = require("express").Router();
const Celebrities = require("./celebrities-model");

function validateCeleb(req, res, next) {
  if (!req.body.celebrity_name) {
    next({ status: 422, message: "Celebrity name required" });
  } else {
    next();
  }
}

router.get("/", (req, res, next) => {
  Celebrities.getAll()
    .then((celebrities) => {
      res.status(200).json(celebrities);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Celebrities.getById(req.params.id)
    .then((celebrity) => {
      res.status(200).json(celebrity);
    })
    .catch(next);
});

router.post("/", validateCeleb, (req, res, next) => {
  Celebrities.insert(req.body)
    .then((newCeleb) => {
      res.status(201).json(newCeleb);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
    Celebrities.remove(req.params.id)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(next)
})
module.exports = router;
