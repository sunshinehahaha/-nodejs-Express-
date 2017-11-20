var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Job = new Schema({
    logo         :String,
    job          :String,
    company      :String,
    experience   :String,
    jobtype      :String,
    place        :String,
    salary       :String,
    flag         :{ type: Number, default: 1 },
    date         :{ type: Date, default: Date.now },
});

var JobModel = mongoose.model('job',Job);

module.exports=JobModel;