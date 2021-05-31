import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
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
import { useDB } from "../../hooks/useDB";
import { addDiaryQuery } from "../../queries/addDiary";

const dialogInitialState = {
  show: false,
  dialog: {},
};

const addDiary = ({ navigation }) => {
  const [dialogState, setDialogState] = useState(dialogInitialState);
  const db = useDB();
  const date = Date.now();
  console.log(db);

  const hideDialog = React.useCallback(() => {
    setDialogState(dialogInitialState);
  }, []);

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
    onSubmit: async (values) => {
      addSubmitHandler(values.title, values.diary, date);
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
    },
    {
      mode: "flat",
      placeholder: "dear diary ...",
      name: "diary",
      multiline: true,
      numberOfLines: 20,
      onChangeText: handleChange("diary"),
    },
  ];

  useEffect(() => {
    console.log("db changed", db);
    if (db) {
      createTable();
    }
  }, [db]);

  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
    return (
      <View key={"field-" + count} style={styles.spacing}>
        <TextInput name={name} {...element} />
      </View>
    );
  });

  const createTable = React.useCallback(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Diaries " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Diary TEXT, CREATED_AT TEXT);"
      );
    });
  }, [db]);

  const addSubmitHandler = (title, diary, createdAt) => {
    if (title && diary) {
      addDiaryQuery(db, { title, diary, createdAt }, () => {
        setDialogState({
          show: true,
          dialog: {
            title: "Successful",
            content: "You have created a new diary!",
          },
        });
      });
    } else {
      setDialogState({
        show: true,
        dialog: {
          title: "Alert",
          content: "You can not create an empty diary!",
        },
      });
    }
  };

  const handleClose = () => {
    if (values.title && values.diary) {
      navigation.navigate("Home");
    }
    hideDialog();
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
        <Dialog visible={dialogState.show} onDismiss={hideDialog}>
          <Dialog.Title>{dialogState.dialog.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogState.dialog.content}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="text" onPress={handleClose}>
              ok
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
  footer: {
    flex: 1,
  },
});

export default addDiary;
