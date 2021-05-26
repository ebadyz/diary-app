import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, IconButton, Card, Title, Paragraph } from "react-native-paper";
import theme from "../../theme";

const date = new Date().getFullYear();

const mockData = [
  {
    id: 1,
    title: "First",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 2,
    title: "Second",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 3,
    title: "Third",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 4,
    title: "Fourth",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 5,
    title: "First",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 6,
    title: "Second",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 7,
    title: "Third",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 8,
    title: "Fourth",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 9,
    title: "First",
    diary: "this is diary...",
    createdAt: date,
  },
  {
    id: 10,
    title: "Second",
    diary: "this is diary...",
    createdAt: date,
  },
];

const Item = ({ title, diary, createdAt }) => (
  <Card.Title
    style={styles.item}
    title={title}
    subtitle={<Paragraph style={{ color: "gray" }}>{diary}</Paragraph>}
    right={(props) => (
      <View {...props}>
        <Button>Edit</Button>
        <Paragraph>{createdAt}</Paragraph>
      </View>
    )}
  />
);

const Home = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} diary={item.diary} createdAt={item.createdAt} />
  );
  return (
    <FlatList
      style={styles.container}
      data={mockData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
    backgroundColor: "#fafaf4",
  },
});
export default Home;
