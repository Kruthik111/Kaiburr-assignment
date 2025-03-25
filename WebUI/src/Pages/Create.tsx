import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { notification, Button, Form, Input } from "antd";
import { useNavigate } from "react-router";

type NotificationType = "success" | "info" | "warning" | "error";

const Create = () => {
  const navigate = useNavigate();

  type FieldType = {
    name?: string;
    owner?: string;
    command?: string;
  };

  const [task, setTask] = useState({
    id: "",
    name: "",
    owner: "",
    command: "",
    taskExecutions: [],
  });

  // Ant design notification utitily
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message: String,
    description: String
  ) => {
    api[type]({
      message: message,
      description: description,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    createTask();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    openNotification(
      "error",
      "Unable to Submit",
      "please provide all the fields"
    );
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  };
  async function setTaskLength() {
    await fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) =>
        setTask((prev) => {
          return { ...prev, ["id"]: data.length + 1 };
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTaskLength();
  }, []);

  async function createTask() {
    await fetch("http://localhost:8080/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok) {
          openNotification(
            "success",
            "Task created",
            "task created succesfully"
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {contextHolder}
      <Form
        name="createform"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="name" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Owner"
          name="owner"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="owner" value={task.owner} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Command"
          name="command"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            name="command"
            onChange={handleInputChange}
            prefix={
              <p
                style={{
                  color: "green",
                }}
              >
                $
              </p>
            }
            style={{
              backgroundColor: "#000",
              color: "green",
              fontWeight: "bold",
              height: "90px",
            }}
            autoCorrect="false"
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Createk
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
