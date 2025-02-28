import { Card, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTask() {
    setLoading(true);
    await fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getTask();
  }, []);

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
      {tasks?.map((task, index) => {
        return (
          <>
            <Card title={index + 1 + " " + task.name} variant="borderless">
              <p>Task name:{task.name}</p>
              <p>Owner: {task.owner}</p>
              <p>
                Command
                {task.command}
              </p>
            </Card>
            <Divider style={{ borderColor: "#7cb305" }} />
          </>
        );
      })}
    </div>
  );
};

export default Home;
