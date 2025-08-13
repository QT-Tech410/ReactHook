import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from "react-i18next";

const TableQuiz = (props) => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleUpdate = (quiz) => {
    setDataUpdate(quiz);
    setIsShowModalUpdateQuiz(true);
  };

  const handleDelete = (quiz) => {
    setDataDelete(quiz);
    setIsShowModalDeleteQuiz(true);
  };
  return (
    <>
      <div>{t("admin.manage-quiz.list-quiz")}: </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.manage-quiz.quiz-name")}</th>
            <th scope="col">{t("admin.manage-quiz.quiz-desc")}</th>
            <th scope="col">{t("admin.manage-quiz.type")}</th>
            <th>{t("admin.manage-quiz.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleUpdate(item)}
                    >
                      {t("admin.manage-quiz.edit")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      {t("admin.manage-quiz.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        setShow={setIsShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        setDataUpdate={setDataUpdate}
      />
      <ModalDeleteQuiz
        show={isShowModalDeleteQuiz}
        setShow={setIsShowModalDeleteQuiz}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
