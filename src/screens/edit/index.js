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
import { useDB } from "../../hooks/useDB";
import { updateDiaryQuery } from "../../queries/updateDiary";

const dialogInitialState = {
  show: false,
  dialog: {},
};

const EditDiary = ({ route, navigation }) => {
  const { item, itemId } = route.params;
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
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
      updateSubmitHandler(values.title, values.diary, date);
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

  const updateSubmitHandler = async (title, diary, date) => {
    if (values.title === "" || values.diary === "") {
      setDialogState({
        show: true,
        dialog: {
          title: "Alert",
          content: "You can not create an empty diary!",
        },
      });
    } else {
      updateDiaryQuery(
        db,
        {
          title,
          diary,
          date,
          itemId,
        },
        () => {
          setDialogState({
            show: true,
            dialog: {
              title: "Successfull",
              content: "You have updated this diary!",
            },
          });
        }
      );
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
      navigation.navigate("Home");
    }
    hideDialog();
  };

  useEffect(() => {
    console.log(dialogState);
  }, [dialogState]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.main}>{renderedFields}</View>
        <View style={styles.footer}>
          <FlatButton text="Update" onPress={submitForm} />
        </View>
      </View>
      {
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
      }
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
