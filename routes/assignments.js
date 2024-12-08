let Assignment = require('../model/assignment');

// Récupérer tous les assignments avec pagination (GET)
exports.getAssignments = (req, res) => {
    const page = parseInt(req.query.page) || 1;   // 默认为第 1 页
    const limit = parseInt(req.query.limit) || 10; // 每页默认显示 10 个

    // 创建一个聚合查询
    let aggregateQuery = Assignment.aggregate();

    // 使用 aggregatePaginate 进行分页
    Assignment.aggregatePaginate(aggregateQuery, { page, limit })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.error('Pagination error:', err);
            res.status(500).send(err);
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