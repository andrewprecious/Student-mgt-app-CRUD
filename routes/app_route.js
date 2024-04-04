const { Router } = require("express");
router = Router();

const {
  homepage,
  allStudentspage,
  addStudentspage,
  postFormpage,
  getSingleStudent,
  deleteUser,
  upload,
  getEditPage,
  updateStudents,
} = require("../controllers/app_controllers");

// get home page
router.get("/", homepage);

// get all students page
router.get("/allStudents", allStudentspage);

// add students
router.get("/addStudents", addStudentspage);

// create a user
router.post("/postForm", upload, postFormpage);

// get single user
router.get("/user/:studentsId", getSingleStudent);

// delete single user
router.delete("/deleteStudents/:studentsId", deleteUser);

// get edit form
router.get("/editStudent/:studentsId", getEditPage);

// update/edit user
router.put("/updateStudents/:studentsId", upload, updateStudents);

module.exports = router;
