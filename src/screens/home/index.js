import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FAB, IconButton, Card, Title, Paragraph } from "react-native-paper";
import theme from "../../theme";
import { format } from "date-fns";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  {
    name: "MainDB",
    location: "default",
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

const date = new Date().getFullYear();

const Home = ({ navigation }) => {
  const [diaries, setDiaries] = useState([]);

  const Item = ({ title, diary, createdAt, id }) => (
    <Card.Title
      style={styles.item}
      title={title}
      subtitle={diary}
      right={(props) => (
        <View {...props} style={{ alignItems: "flex-end" }}>
          <IconButton
            icon="square-edit-outline"
            size={22}
            onPress={() => {
              navigation.navigate("Edit", {
                item: {
                  title: title,
                  diary: diary,
                },
                itemId: id,
              });
            }}
            color="black"
          />
          <Paragraph>
            {format(new Date(Number(createdAt)), "MM dd yyyy")}
          </Paragraph>
        </View>
      )}
    />
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.Title}
      diary={item.Diary}
      id={item.ID}
      createdAt={item.Date}
    />
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Diaries", [], (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            const diaries = Array.from({ length: results.rows.length })
              .fill()
              .map((_, i) => results.rows.item(i));
            setDiaries(diaries);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {diaries.length ? (
        <FlatList
          style={styles.container}
          data={diaries}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
        />
      ) : (
        <View style={styles.message}>
          <Title style={{ color: "gray" }}>No Diary</Title>
        </View>
      )}
      <FAB
        style={styles.fab}
        color={theme.colors.background}
        icon="plus"
        onPress={() => navigation.navigate("Add")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  item: {
    elevation: 7,
    backgroundColor: theme.colors.background,
    paddingVertical: 15,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  message: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});
export default Home;
