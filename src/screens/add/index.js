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
import FlatButton from "../../components/button";
import { useDB } from "../../hooks/useDB";
import { addDiaryQuery } from "../../queries/addDiary";
import { useTheme } from "@react-navigation/native";

const dialogInitialState = {
  show: false,
  dialog: {},
};

const addDiary = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    input: {
      backgroundColor: colors.surface,
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
  const [dialogState, setDialogState] = useState(dialogInitialState);
  const db = useDB();
  const date = Date.now();

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

  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
    return (
      <View key={count} style={styles.spacing}>
        <TextInput name={name} {...element} style={styles.input} />
      </View>
    );
  });

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

export default addDiary;
