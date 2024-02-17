import studentModel from "./studentModel.js";

//=====CREATE========================
export const createStudent = async (req, res) => {
    try {
        const result = await studentModel.create({
            name: req.body.name,
            age: req.body.age,
            picture: req.body.picture,
        });
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

// =====GET ALL========================
export const getStudent = async (req, res) => {
    try {
        const result = await studentModel.find();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// // =====GET ONE======================
export const getOneStudent = async (req, res) => {
    const result = await studentModel.findOne({ _id: req.params.idStudent });
    res.status(200).json({ result });
};

// // =====DELETE==========================
export const deleteStudent = async (req, res) => {
    try {
        const result = await studentModel.findByIdAndDelete({
            _id: req.params.idStudent,
        });
        res.status(200).json({ message: "Successfully Deleted" });
        console.log(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
// // =====UPDATE===========================
export const updateStudent = async (req, res) => {
    try {
        const result = await studentModel.findByIdAndUpdate(
            req.params.idStudent,
            req.body,
            { new: true }
        );
        res.status(200).json({ result });
        console.log(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
