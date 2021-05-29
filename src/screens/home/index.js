import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import {
  FAB,
  IconButton,
  Card,
  Title,
  Paragraph,
  List,
  Text,
  Divider,
  Subheading,
  Headline,
} from "react-native-paper";
import theme from "../../theme";
import SQLite from "react-native-sqlite-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

const Item = ({ title, diary, createdAt }) => (
  <Card.Title
    style={styles.item}
    title={title}
    subtitle={<Paragraph style={{ color: "gray" }}>{diary}</Paragraph>}
    right={(props) => (
      <View {...props}>
        <IconButton
          icon="square-edit-outline"
          size={22}
          onPress={() => navigation.openDrawer()}
          color="black"
        />
        {/* <Paragraph>{createdAt}</Paragraph> */}
      </View>
    )}
  />
);

const Home = ({ navigation }) => {
  const [diaries, setDiaries] = useState([]);
  const [visible, setVisible] = React.useState(true);

  const renderItem = ({ item }) => (
    <Item title={item.Title} diary={item.Diary} />
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Diaries", [], (tx, results) => {
          var len = results.rows.length;
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
          <Title style={{color: 'gray'}}>No Diary</Title>
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
  }
});
export default Home;
