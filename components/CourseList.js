import Course from "./Course.js";
import CourseSelector from "./CourseSelector.js";
import TermSelector from "./TermSelector.js";
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getCourseTerm } from "./utils/course.js";

const CourseList = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");

  const termCourses = courses.filter(
    course => selectedTerm === getCourseTerm(course)
  );

  return (
    <ScrollView>
      <TermSelector
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <CourseSelector courses={termCourses} />
    </ScrollView>
  );
};

export default CourseList;
