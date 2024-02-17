import axios from "axios";
export const getAllStudent = () => {
    return axios
        .get("http://localhost:3002/api/student/")
        .then((res) => {
            console.log("res", res);
            return res.data.result; // Return the result from the response
        })
        .catch((error) => {
            console.error("Error fetching students:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
};

export const addNewStudent = (value) => {
    return axios
        .post("http://localhost:3002/api/student/", {
            name: value.name,
            age: value.age,
            picture: value.picture,
        })
        .then((res) => {
            console.log("res add", res);
            return res.data.result; // Return the result from the response
        })
        .catch((error) => {
            console.error("Error fetching students:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
};

export const deleteStudent = (id) => {
    return axios
        .delete(`http://localhost:3002/api/student/delete/${id}`)
        .then((res) => {
            console.log(" message: Delete successfull " + id);
            return res.data.result; // Return the result from the response
        })
        .catch((error) => {
            console.error("Error fetching students:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
};

export const editStudent = (id, values) => {
    return axios
        .put(`http://localhost:3002/api/student/update/${id}`, {
            name: values.name,
            age: values.age,
            picture: values.picture,
        })
        .then((res) => {
            console.log(" message: Update successfull " + id);
            return res.data.result; // Return the result from the response
        })
        .catch((error) => {
            console.error("Error fetching students:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
};
