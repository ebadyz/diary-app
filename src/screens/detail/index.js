import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  ActivityIndicator,
  Paragraph,
  Title,
  Subheading,
} from "react-native-paper";
import { useDB } from "../../hooks/useDB";
import { diaryDetailQuery } from "../../queries/diaryDetail";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const DiaryDetail = ({ route }) => {
  const { itemId } = route.params;
  console.log("detail page", { itemId });
  const db = useDB();
  const { colors } = useTheme();

  const [itemState, setItemState] = useState({ state: "pending", item: null });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 10,
      paddingVertical: 40,
      paddingHorizontal: 30,
      borderRadius: 50,
    },
    indicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: colors.text,
      marginBottom: 15,
    },
    diary: {
      color: colors.text,
    },
  });

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
      <View style={styles.indicator}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          animating={true}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Subheading style={styles.title}>{itemState.item.Title}</Subheading>
      <Paragraph style={styles.diary}>{itemState.item.Diary}</Paragraph>
    </ScrollView>
  );
};

export default DiaryDetail;
