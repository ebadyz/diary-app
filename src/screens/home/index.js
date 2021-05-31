import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  FAB,
  IconButton,
  Card,
  Title,
  Caption,
  ActivityIndicator,
} from "react-native-paper";
import { format } from "date-fns";
import { useDB } from "../../hooks/useDB";
import { allDiariesQuery } from "../../queries/allDiaries";

const Home = ({ navigation }) => {
  const [diariesState, setDiariesState] = useState({ state: "pending" });
  const db = useDB();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    item: {
      borderBottomWidth: 3,
      borderBottomColor: colors.accent,
      backgroundColor: colors.surface,
      paddingVertical: 15,
    },
    fab: {
      position: "absolute",
      margin: 20,
      right: 0,
      bottom: 0,
      backgroundColor: colors.primary,
    },
    message: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });

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
              color={colors.text}
            />
            <Caption>
              {format(new Date(Number(createdAt)), "MMM dd, yyyy")}
            </Caption>
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
      setDiariesState({ state: "success", diaries });
    });
  }, [db]);

  if (diariesState.state === "pending") {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {diariesState.diaries.length ? (
        <FlatList
          style={styles.container}
          data={diariesState.diaries}
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
    </View>
  );
};

export default Home;
