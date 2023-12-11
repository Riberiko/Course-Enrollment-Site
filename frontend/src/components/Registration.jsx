import { useEffect, useState } from "react";
import { statusCheck } from "../helper";
import CourseSearch from "./CourseSearch";
import ClassItem from "./ClassItem";

export default () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [layout, setLayout] = useState(true)

  const [reload, setReload] = useState(false)

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
      <CourseSearch layout={layout} setLayout={setLayout} items={data} categories={categories} setList={setFilteredData} />
      {!isLoading ? (
        <>
          {filteredData.map((item, index) => (
            <ClassItem key={index} data={item} layout={layout} refresh={()=>setReload(!reload)} />
          ))}
        </>
      ) : (
        <>Loading the courses</>
      )}
    </>
  );
};
