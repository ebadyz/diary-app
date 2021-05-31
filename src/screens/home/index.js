import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { FAB, IconButton, Card, Title, Paragraph } from "react-native-paper";
import { format } from "date-fns";
import { useDB } from "../../hooks/useDB";
import { allDiariesQuery } from "../../queries/allDiaries";

const Home = ({ navigation }) => {
  const [diaries, setDiaries] = useState([]);
  const db = useDB();

  const Item = ({ title, diary, createdAt, id }) => (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Detail", { itemId: id });
      }}
    >
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
              {format(new Date(Number(createdAt)), "MMM dd, yyyy")}
            </Paragraph>
          </View>
        )}
      />
    </TouchableHighlight>
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

  const getData = useCallback(() => {
    allDiariesQuery(db, (diaries) => {
      setDiaries(diaries);
    });
  }, [db]);

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
        color="#ffffff"
        icon="plus"
        onPress={() => navigation.navigate("Add")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  item: {
    elevation: 7,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#1ed760",
  },
  message: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
export default Home;
