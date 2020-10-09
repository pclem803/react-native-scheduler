import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import Form from "../components/Form.js";
import { firebase } from "../firebase.js";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirmation password must match password"
  )
});

const SignInScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState("");

  async function handleOnSubmit(values) {
    const { email, password, confirmPassword } = values;

    if (confirmPassword === password) {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password);
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button
            title={values =>
              values.confirmPassword.length > 0 ? "Sign up" : "Log in"
            }
          />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SignInScreen;
