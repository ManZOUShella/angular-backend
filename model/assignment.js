let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
}, { versionKey: false }); // 禁用 __v 字段

// 启用分页插件
AssignmentSchema.plugin(aggregatePaginate);

// 通过模型导出 'Assignment' 数据
module.exports = mongoose.model('Assignment', AssignmentSchema);