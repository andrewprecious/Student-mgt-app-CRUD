const mainUser = require("../model/user");
const multer = require("multer");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  // file name for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

const homepage = (req, res) => {
  res.render("index", { title: "Homepage" });
};

const allStudentspage = async (req, res) => {
  try {
    const students = await mainUser.find().sort({ createdAt: -1 });
    res.render("allStudents", { title: "All students", allStudents: students });
  } catch (err) {
    console.log(err);
  }
};

const addStudentspage = (req, res) => {
  res.render("addStudents", { title: "addStudents" });
};

const postFormpage = async (req, res) => {
  try {
    const user = new mainUser({
      name: req.body.name,
      email: req.body.email,
      school: req.body.school,
      age: req.body.age,
      class: req.body.class,
      message: req.body.message,
      image: req.file.filename,
    });

    // console.log(user);
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const id = req.params.studentsId;
    const student = await mainUser.findById(id);
    res.render("singleStudent", { title: "single student page", student });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.studentsId;
    console.log(id);
    const student = await mainUser.findByIdAndDelete(id);
    if (student.image !== "") {
      try {
        fs.unlinkSync("./uploads/" + student.image);
      } catch (err) {
        console.log(err);
      }
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

// get Edit page
const getEditPage = async (req, res) => {
  try {
    const id = req.params.studentsId;
    const students = await mainUser.findById(id);

    // console.log(user);
    res.render("updateStudents", {
      title: `Edit ${students.name}'s information`,
      students,
    });
  } catch (err) {
    console.log(err);
  }
};

// update user
const updateStudents = async (req, res) => {
  try {
    const id = req.params.studentsId;
    let new_image = "";
    // if new file
    if (req.file) {
      new_image = req.file.filename;
      // remove old image
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      // keep old image
      new_image = req.body.old_image;
    }

    // update user
    await mainUser.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: new_image,
      },
      { new: true }
    );
    res.redirect("/allStudents");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  homepage,
  allStudentspage,
  addStudentspage,
  postFormpage,
  getSingleStudent,
  deleteUser,
  upload,
  getEditPage,
  updateStudents,
};
