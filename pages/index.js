import {
  Grid,
  TextInput,
  ActionIcon,
  Box,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { Search, Sun, Moon } from "tabler-icons-react";
import AppBar from "../components/AppBar";
import Card from "../components/Card";

export async function getServerSideProps() {
  const ids = Array.from(Array(11).keys(), (_, i) => i + 1);
  const responses = [];
  ids.forEach((ele) => {
    responses.push(
      fetch(`https://jsonplaceholder.typicode.com/photos/${ele}`).then((res) =>
        res.json()
      )
    );
  });
  const results = await Promise.all(responses);
  const data = {};
  data.results = results;
  return {
    props: data,
  };
}

const Home = ({ results }) => {
  const [search, setSearch] = useState("");
  const [localResults, setLocalResults] = useState(results);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const handleSearch = (value) => {
    if (value === "") {
      setLocalResults(results);
    } else {
      setLocalResults(
        localResults.filter((ele) =>
          ele.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    setSearch(value);
  };

  return (
    <>
      <AppBar
        content={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              icon={<Search size={16} />}
              placeholder="Search posts"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ActionIcon
              onClick={() => toggleColorScheme()}
              title="Toggle colour scheme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </ActionIcon>
          </Box>
        }
      />
      <Grid>
        {localResults.length > 0 ? (
          localResults.map((ele) => (
            <Grid.Col key={ele.id} xs={12} sm={6} md={4} lg={3}>
              <Card title={ele.title} src={ele.url} />
            </Grid.Col>
          ))
        ) : (
          <Grid.Col span={12}>
            <Text weight={500} mt={100} align="center">
              No match found
            </Text>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
};

export default Home;
