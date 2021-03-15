module.exports = app => {
    const tutorials = require("../controllers/tutorial");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);
    router.post("/comments", tutorials.createComment);


    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
    router.get("/comments/:id", tutorials.findOneComment);


    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};
