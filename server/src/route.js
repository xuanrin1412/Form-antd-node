import express from "express";
import {
    createStudent,
    getStudent,
    getOneStudent,
    deleteStudent,
    updateStudent,
} from "./studentController.js";

const router = express.Router();

// //xem san pham yêu thich
// router.get("/featured", getFeatured);

//them
router.post("/", createStudent);
// xem tat ca
router.get("/", getStudent);
// xem mot
router.get("/findOne/:idStudent", getOneStudent);
// xoa
router.delete("/delete/:idStudent", deleteStudent);
//sua
router.put("/update/:idStudent", updateStudent);

export default router;
