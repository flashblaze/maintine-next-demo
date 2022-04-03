import { Header, Text } from "@mantine/core";

const AppBar = ({ content }) => {
  // Not using proptypes
  if (!content) {
    content = "";
  }
  return <Header height={60}>{content}</Header>;
};

export default AppBar;
