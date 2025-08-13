import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  postAssignQuiz,
  getAllUsers,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AssignQuiz = () => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(users);
    }
  };

  const handleAssign = async () => {
    let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (rs && rs.EC === 0) {
      toast.success(rs.EM);
    } else {
      toast.error(rs.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">{t("admin.manage-quiz.s-quiz")}:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">{t("admin.manage-quiz.s-user")}:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>
          {t("admin.manage-quiz.assign")}
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
