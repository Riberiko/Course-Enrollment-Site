import { useEffect, useState } from "react";
import { statusCheck } from "../helper";
import CourseSearch from "./CourseSearch";
import ClassItem from "./ClassItem";

export default () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/GetActiveCourseList', {
          credentials: 'include'
        });

        const responseData = await statusCheck(res);
        setData(responseData);
        setFilteredData(responseData)
        setLoading(false);

        setCategories([...new Set(responseData.map(item => item.code_type))])
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CourseSearch items={data} categories={categories} setList={setFilteredData} />
      {!isLoading ? (
        <>
          {filteredData.map((item, index) => (
            <ClassItem key={index} data={item} />
          ))}
        </>
      ) : (
        <>Loading the courses</>
      )}
    </>
  );
};
