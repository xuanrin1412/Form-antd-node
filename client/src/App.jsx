import "./App.css";
import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Modal,
    Table,
    Image,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    getAllStudent,
    addNewStudent,
    deleteStudent,
    editStudent,
} from "./API";

function App() {
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        getAllStudent()
            .then((res) => {
                const formattedData = res.map((student, index) => ({
                    key: index + 1,
                    id: student._id,
                    name: student.name,
                    age: student.age,
                    picture: (
                        <Image width={50} height={50} src={student.picture} />
                    ),
                }));
                setDataSource(formattedData);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
    };

    const showModalAdd = () => {
        setIsModalAddOpen(true);
        setImageUrl("");
    };

    const handleAdd = (values) => {
        addNewStudent(values)
            .then((newStudent) => {
                setDataSource((prevDataSource) => [
                    ...prevDataSource,
                    {
                        key: dataSource.length + 1,
                        id: newStudent._id,
                        name: newStudent.name,
                        age: newStudent.age,
                        picture: (
                            <Image
                                width={50}
                                height={50}
                                src={newStudent.picture}
                            />
                        ),
                    },
                ]);
                setIsModalAddOpen(false);
                form.resetFields();
            })
            .catch((error) => {
                console.error("Error adding new student:", error);
            });
    };

    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
        form.resetFields();
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this student record? ",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                deleteStudent(record.id)
                    .then(() => {
                        setDataSource((prevDataSource) =>
                            prevDataSource.filter(
                                (student) => student.id !== record.id
                            )
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting student:", error);
                    });
            },
        });
    };

    const handleEdit = (record) => {
        setIsEditing(true);
        setEditingRecord(record);
        form.setFieldsValue({
            name: record.name,
            age: record.age,
            picture: record.picture.props.src,
        });
    };
    useEffect(() => {
        if (editingRecord !== null) {
            form.setFieldsValue({
                name: editingRecord.name,
                age: editingRecord.age,
                picture: editingRecord.picture.props.src,
            });
            // Set the imageUrl state with the URL of the student's picture
            setImageUrl(editingRecord.picture.props.src);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingRecord]);

    const handleEditSubmit = (values) => {
        const { id } = editingRecord;
        editStudent(id, values)
            .then((updatedStudent) => {
                console.log("updatedStudent", updatedStudent);

                setIsEditing(false);
                const updatedDataSource = dataSource.map((student) =>
                    student.id === id
                        ? {
                              ...student,
                              ...values,
                              picture: (
                                  <Image
                                      width={50}
                                      height={50}
                                      src={values.picture}
                                  />
                              ),
                          }
                        : student
                );
                setDataSource(updatedDataSource);
                form.resetFields();
            })
            .catch((error) => {
                console.error("Error editing student:", error);
            });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "key",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Picture",
            dataIndex: "picture",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <>
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <DeleteOutlined
                        onClick={() => handleDelete(record)}
                        style={{ marginLeft: 20 }}
                    />
                </>
            ),
        },
    ];
    const [imageUrl, setImageUrl] = useState("");
    const handlePictureChange = (e) => {
        setImageUrl(e.target.value);
    };

    return (
        <Card>
            <Button
                onClick={showModalAdd}
                type="primary"
                style={{ marginBottom: 10 }}
            >
                Add New Student
            </Button>
            <Table columns={columns} dataSource={dataSource}></Table>

            <Modal
                title="Form Modal"
                open={isModalAddOpen}
                footer={null}
                onCancel={handleCancelAdd}
            >
                <Form
                    form={form}
                    onFinish={handleAdd}
                    // initialValues={{ age: 18 }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Student Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Student Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Age!",
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={100}
                            placeholder="Enter your age"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Student Picture"
                        name="picture"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Picture!",
                            },
                        ]}
                    >
                        <Input
                            value={imageUrl}
                            onChange={handlePictureChange}
                        />
                    </Form.Item>
                    {imageUrl && <img width={100} src={imageUrl} />}
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button
                            onClick={handleCancelAdd}
                            style={{ marginLeft: 10 }}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Editing"
                open={isEditing}
                footer={null}
                onCancel={() => {
                    setIsEditing(false), form.resetFields();
                }}
            >
                <Form
                    form={form}
                    onFinish={handleEditSubmit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ age: 18 }}
                >
                    <Form.Item
                        label="Student Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Student Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Age!",
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={100}
                            placeholder="Enter your age"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Student Picture"
                        name="picture"
                        rules={[
                            {
                                required: true,
                                message: "Please input Student Picture!",
                            },
                        ]}
                    >
                        <Input
                            value={imageUrl}
                            onChange={handlePictureChange}
                        />
                    </Form.Item>
                    {imageUrl && <img width={100} src={imageUrl} />}
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditing(false), form.resetFields();
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

export default App;
