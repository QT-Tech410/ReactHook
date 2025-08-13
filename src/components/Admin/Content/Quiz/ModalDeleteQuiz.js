import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../../services/apiService";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manage-quiz.modal.t-delete")}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.manage-quiz.modal.b-delete")}. id =
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteQuiz();
            }}
          >
            {t("admin.manage-quiz.modal.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
