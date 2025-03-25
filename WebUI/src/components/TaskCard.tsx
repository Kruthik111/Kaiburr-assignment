import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Input,
  Modal,
  notification,
  Space,
  Tooltip,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import { FormProps } from "antd";
import EditTaskModal from "./EditTaskModal.js";

type NotificationType = "success" | "info" | "warning" | "error";

const TaskCard = ({ task }) => {
  const screens = useBreakpoint();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [runTask, setRunTask] = useState(false);

  type FieldType = {
    name?: string;
    owner?: string;
    command?: string;
  };

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
    updateTask();
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

  async function updateTask() {
    await fetch(`http://localhost:8080/tasks/update/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTask),
    })
      .then((res) => {
        if (res.ok) {
          openNotification(
            "success",
            "Task Updated",
            "task updated succesfully"
          );
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async function deleteTask() {
    await fetch(`http://localhost:8080/tasks/update/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          openNotification(
            "success",
            "Task Deleted",
            "Deleted Task succesfully"
          );
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <Card
      title={task.id + " " + task.name}
      variant="borderless"
      style={{
        borderRadius: "10px",
      }}
    >
      <Flex justify="space-between">
        <div>
          <p>Task name:{task.name}</p>
          <p>Owner: {task.owner}</p>
          <p>Command: {task.command}</p>
        </div>
        <Space size="large" direction={screens.sm ? "horizontal" : "vertical"}>
          <Tooltip title="run task" placement="bottom">
            <Button
              loading={runTask}
              onClick={() => setRunTask(true)}
              icon={
                <PlayCircleOutlined
                  style={{ fontSize: "20px", color: "limegreen" }}
                  twoToneColor="#eb2f96"
                />
              }
            />
          </Tooltip>
          <Tooltip title="Edit task" placement="bottom">
            <EditOutlined
              style={{ fontSize: "20px", color: "indigo " }}
              twoToneColor="#eb2f96"
              onClick={() => setOpenEditModal(true)}
            />
          </Tooltip>
          <Tooltip title="Delete task" placement="bottom">
            <Button
              icon={
                <DeleteOutlined
                  style={{ fontSize: "20px", color: "red" }}
                  twoToneColor="#eb2f96"
                />
              }
            />
          </Tooltip>
        </Space>
      </Flex>

      {runTask && (
        <Input
          name="command"
          readOnly
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
            transition: "ease-in-out",
            transitionDelay: "3000",
          }}
          autoCorrect="false"
          value={task.command}
        />
      )}
      <Modal
        open={openEditModal}
        onOk={() => setOpenEditModal(false)}
        onCancel={() => setOpenEditModal(false)}
      >
        <EditTaskModal task={task} />
      </Modal>
    </Card>
  );
};

export default TaskCard;
