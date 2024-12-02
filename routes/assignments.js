let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
exports.getAssignments = (req, res) => {
    Assignment.find((err, assignments) => {
        if (err) {
            res.send(err);
        } else {
            res.send(assignments);
        }
    });
};

// Récupérer un assignment par son id (GET)
exports.getAssignment = (req, res) => {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) {
            res.send(err);
        } else {
            res.json(assignment);
        }
    });
};

// Ajout d'un assignment (POST)
exports.postAssignment = (req, res) => {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment);

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        } else {
            res.json({ message: `${assignment.nom} saved!` });
        }
    });
};

// Update d'un assignment (PUT)
exports.updateAssignment = (req, res) => {
    console.log("UPDATE reçu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ message: 'updated' });
        }
    });
};

// Suppression d'un assignment (DELETE)
exports.deleteAssignment = (req, res) => {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: `${assignment.nom} deleted` });
        }
    });
};
