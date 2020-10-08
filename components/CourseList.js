import Course from "./Course";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

const CourseList = ({ courses }) => (
  <ScrollView>
    <View style={styles.courseList}>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default CourseList;
