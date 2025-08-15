import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHistoty } from "../../services/apiService";
import moment from "moment";

const History = (props) => {
  const { t } = useTranslation();
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistoty();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          id: item.id,
          name: item?.quizHistory?.name ?? "",
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListHistory(newData);
    }
  };

  return (
    <>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.map((item, index) => {
              return (
                <tr key={`table-history-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          {listHistory && listHistory.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default History;
