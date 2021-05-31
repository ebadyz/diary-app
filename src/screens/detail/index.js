import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import theme from "../../theme";
import { useDB } from "../../hooks/useDB";
import { diaryDetailQuery } from "../../queries/diaryDetail";

const DiaryDetail = ({ route }) => {
  const { itemId } = route.params;
  console.log("detail page", { itemId });
  const db = useDB();

  const [itemState, setItemState] = useState({ state: "pending", item: null });

  useEffect(() => {
    diaryDetailQuery(db, { id: itemId }, (item) => {
      console.log({ item });
      setItemState({
        state: "success",
        item,
      });
    });
  }, [db]);

  if (itemState.state === "pending") {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: "black" }}>title: {itemState.item.Title}</Text>
        <Text style={{ color: "black" }}>diary: {itemState.item.Diary}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  spacing: {
    paddingBottom: 10,
  },
  main: {
    flex: 6,
  },
  btn: {
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
  },
});

export default DiaryDetail;
