import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { useFormik } from "formik";
import theme from "../../theme";
import FlatButton from "../../components/button";
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
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [dialogActionText, setDialogActionText] = useState("");
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
        <TextInput name={name} {...element} />
      </View>
    );
  });

  const updateSubmitHandler = async (title, diary) => {
    if (!values.title && !values.diary) {
      setShowDialog(true);
      setDialogTitle("Alert");
      setDialogContent("You can not create an empty diary!");
      setDialogActionText("ok");
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Diaries SET Title=? , Diary=? WHERE ID=?",
            [title, diary, itemId],
            () => {
              setShowDialog(true);
              setDialogTitle("Successfull");
              setDialogContent("You have been updated diary!");
              setDialogActionText("ok");
            },
            (error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFieldValue("title", item.title);
      setFieldValue("diary", item.diary);
    });
    return unsubscribe;
  }, [navigation]);

  const handleClose = () => {
    if (values.title && values.diary) {
      setShowDialog(false);
      navigation.navigate("Home");
    } else {
      setShowDialog(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.main}>{renderedFields}</View>
        <View style={styles.footer}>
          <FlatButton text="Create" onPress={submitForm} />
        </View>
      </View>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogContent}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="text" onPress={handleClose}>
              {dialogActionText}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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

export default EditDiary;
