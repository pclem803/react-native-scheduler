import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import Form from "../components/Form.js";
import { firebase } from "../firebase.js";

const validationSchema = Yup.object().shape({
  id: Yup.string()
    .required()
    .matches(/(F|W|S)\d{3,}/, "Must be a term and 3-digit number")
    .label("ID"),
  meets: Yup.string()
    .required()
    .matches(
      /(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/,
      "Must be weekdays followed by start and end time"
    )
    .label("Meeting times"),
  title: Yup.string()
    .required()
    .label("Title")
});

const CourseEditScreen = ({ route }) => {
  const course = route.params.course;

  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(values) {
    const { id, meets, title } = values;
    const course = { id, meets, title };
    firebase
      .database()
      .ref("courses")
      .child(id)
      .set(course)
      .catch(error => {
        setSubmitError(error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            id: course.id,
            meets: course.meets,
            title: course.title
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}
        >
          <Form.Field
            style={styles.field}
            name="id"
            leftIcon="identifier"
            placeholder={course.id}
            autoCapitalize="none"
            autoFocus={true}
          />
          <Form.Field
            style={styles.field}
            name="meets"
            leftIcon="calendar-range"
            placeholder={course.meets}
            autoCapitalize="none"
          />
          <Form.Field
            style={styles.field}
            name="title"
            leftIcon="format-title"
            placeholder={course.title}
          />
          <Form.Button title={"Update"} />
          {<Form.ErrorMessage error={submitError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccccb3"
  },
  field: {
    height: 40,
    width: 300,
    padding: 5,
    backgroundColor: "white"
  },
  fieldContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  label: {
    fontWeight: "bold"
  }
});

export default CourseEditScreen;
