import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModalViewUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataUpdate } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetDataUpdate();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  //   const handleUploadImage = (event) => {
  //     if (event.target && event.target.files && event.target.files[0]) {
  //       setPreviewImage(URL.createObjectURL(event.target.files[0]));
  //       setImage(event.target.files[0]);
  //     } else {
  //     }
  //   };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //   const handleSubmitCreateUser = async () => {
  //     //validate
  //     const isValidEmail = validateEmail(email);
  //     if (!isValidEmail) {
  //       toast.error("Invalid email");
  //       return;
  //     }

  //     let data = await putUpdateUser(dataUpdate.id, username, role, image);

  //     if (data && data.EC === 0) {
  //       toast.success(data.EM);
  //       handleClose();
  //       await props.fetchListUsers();
  //     }

  //     if (data && data.EC !== 0) {
  //       toast.error(data.EM);
  //     }
  //   };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manage-user.modal.t-view")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                {t("admin.manage-user.modal.password")}
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {t("admin.manage-user.modal.username")}
              </label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("admin.manage-user.modal.role")}
              </label>
              <select
                className="form-select "
                value={role}
                disabled
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            {/* <div className="col-md-12">
              <label className="form-label lable-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => {
                  handleUploadImage(event);
                }}
              />
            </div> */}
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>{t("admin.manage-user.modal.p-image")}</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            {t("admin.manage-user.modal.close")}
          </Button>
          {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
