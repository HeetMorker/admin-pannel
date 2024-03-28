const express = require("express");
const { PORT } = require("./views/config");
const connectDb = require("./views/db-connect");
const User = require("./views/Schema");
const multer = require("multer"); // Import multer
const app = express();
app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

connectDb();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
    }
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.render("pages/index");
});

// POST route to handle form submission with file upload
app.post('/', upload.single('formValidationFile'), async (req, res) => {
    try {
        const { formValidationName, formValidationEmail, formValidationPass, formValidationConfirmPass, formValidationSelect2, formValidationLang, formValidationHobbies, formValidationTech, formValidationDob, formValidationBio, formValidationGender, formValidationPlan, formValidationSwitch, formValidationCheckbox } = req.body;

        const newUser = new User({
            name: formValidationName,
            email: formValidationEmail,
            password: formValidationPass,
            profilePic: req.file ? req.file.filename : '', // Use req.file.filename for the uploaded file name
            country: formValidationSelect2,
            languages: formValidationLang,
            hobbies: formValidationHobbies,
            tech: formValidationTech,
            dob: formValidationDob,
            bio: formValidationBio,
            gender: formValidationGender,
            plan: formValidationPlan,
            sendEmails: formValidationSwitch === 'on',
            agreeTerms: formValidationCheckbox === 'on'
        });

        await newUser.save();

        res.redirect('/');
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
