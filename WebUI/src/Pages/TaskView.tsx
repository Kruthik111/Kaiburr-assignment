import { Divider, Flex, List, Skeleton, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
const { Title } = Typography;
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [displayTasks, setDisplayTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function getTask() {
    setLoading(true);
    await fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    if (!search) {
      setDisplayTask(tasks);
      return;
    }
    var showTask = tasks.filter((task) => {
      return (
        task.name.toLowerCase().includes(search) ||
        task.owner.toLowerCase().includes(search)
      );
    });
    setDisplayTask(showTask);
  }, [search, tasks]);

  if (loading) {
    return (
      <>
        <Skeleton loading={loading} active avatar>
          <List.Item.Meta title={"sasad"} description={"sasad"} />
          {"sdasd"}
        </Skeleton>
        <Skeleton loading={loading} active avatar>
          <List.Item.Meta title={"sasad"} description={"sasad"} />
          {"sdasd"}
        </Skeleton>
        <Skeleton loading={loading} active avatar>
          <List.Item.Meta title={"sasad"} description={"sasad"} />
          {"sdasd"}
        </Skeleton>
      </>
    );
  }

  return (
    <div>
      <Flex justify="space-between">
        <Title level={3}>View Tasks</Title>
        <Search
          addonBefore="Search"
          placeholder="input search text"
          allowClear
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: 304,
            backgroundColor: "#9b249d",
            marginBottom: "10px",
          }}
          size="large"
        />
      </Flex>
      {displayTasks?.length > 0 ? (
        displayTasks?.map((task, index) => {
          return (
            <div key={index}>
              <TaskCard task={task} />
              <Divider style={{ borderColor: "#7cb305" }} />
            </div>
          );
        })
      ) : (
        <Flex justify="center">
          <Title level={2}>Nothing to Display</Title>
        </Flex>
      )}
    </div>
  );
};

export default Home;
