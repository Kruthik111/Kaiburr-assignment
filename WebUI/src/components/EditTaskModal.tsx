import { Button, Form, Input, notification } from "antd";
import { useState } from "react";

const EditTaskModal = ({ task }) => {
  const [editTask, setEditTask] = useState(task);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setEditTask((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <Form
        name="editform"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please provide Task name!" }]}
        >
          <Input
            name="name"
            value={editTask.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: "Please input Owner name!" }]}
        >
          <Input
            name="owner"
            value={editTask.owner}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Command"
          name="command"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            name="command"
            value={editTask.command}
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
        <Form.Item label={null} name="submit">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditTaskModal;
