var mongoose               = require("mongoose"),
    passportLocalMongoose  = require("passport-local-mongoose");
    
var appSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    contact_number: String,
    p_name: String,
    p_email: String,
    p_contact_number: String,
    app_type: Number,
    bday: Date,
    school_type: String,
    year: String,
    specialty: String,
    gpa: String,
    essay: String,
    extra: String,
    discover: String,
    major: String
});

appSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model("Applicant", appSchema);