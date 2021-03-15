const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Op = db.Sequelize.Op;


exports.getAllPosts = async (req, res) => {
    try {
        const tutorials = await Tutorial.findAll({include: ["comments"]});
        return res.status(200).json({
            success: true,
            totalData: tutorials.length,
            data: tutorials,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    try {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const tutorial = await Tutorial.create(req.body);
        return res.status(200).json({
            success: true,
            totalData: tutorial.length,
            data: tutorial,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;


    Tutorial.findAll({include: ["comments"]})
        .then(data => {

            res.status(200).json({
                success: true,
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};
exports.createComment =  async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const comment = await Comment.create(req.body);
        return res.status(200).json({
            success: true,
            totalData: comment.length,
            data: comment,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id, {include: ["comments"]})
        .then(data => {
            res.status(200).json({
                success: true,
                data: data
            })
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });

};
exports.findOneComment = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id, {include: ["tutorial"]})
        .then(data => {
            res.status(200).json({
                success: true,
                data: data
            })
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });

};
exports.updateComment = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });

};

exports.deleteComment = (req, res) => {
    const id = req.params.id;
    Comment.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });

};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Tutorials were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};