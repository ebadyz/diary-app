import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Headline, Subheading } from "react-native-paper";
import { useFormik } from "formik";
import theme from "../../theme";
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

const EditDiary = ({ route, navigation }) => {
  const { item, itemId } = route.params;
  const {
    values,
    errors,
    touched,
    handleChange,
    submitForm,
    handleBlur,
    isValid,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      title: "",
      diary: "",
    },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
      updateSubmitHandler(values.title, values.diary);
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const fields = [
    {
      mode: "flat",
      placeholder: "title",
      name: "title",
      onChangeText: handleChange("title"),
      value: values.title,
    },
    {
      mode: "flat",
      placeholder: "dear diary ...",
      name: "diary",
      multiline: true,
      numberOfLines: 20,
      onChangeText: handleChange("diary"),
      value: values.diary,
    },
  ];

  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
    return (
      <View key={"field-" + count} style={styles.spacing}>
        <TextInput name={name} {...element} fullWidth />
        {touched[name] && errors[name] && (
          <HelperText type="error" visible={errors}>
            {errors[name]}
          </HelperText>
        )}
      </View>
    );
  });

  const customAlert = () =>
    Alert.alert("Success", "Your diary has been updated", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);

  const updateSubmitHandler = async (title, diary) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Diaries SET Title=? , Diary=? WHERE ID=?",
          [title, diary, itemId],
          () => {
            customAlert();
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFieldValue("title", item.title);
      setFieldValue("diary", item.diary);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>{renderedFields}</View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          uppercase={false}
          color={theme.colors.primary}
          style={styles.btn}
          labelStyle={{ color: theme.colors.text }}
          onPress={submitForm}
        >
          update
        </Button>
      </View>
    </View>
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

export default EditDiary;
