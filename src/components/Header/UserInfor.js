import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import "./Share.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { updateProfile } from "../../services/apiService";
import { toast } from "react-toastify";

const UserInfor = () => {
  const { t } = useTranslation();

  const account = useSelector((state) => state.user.account);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUpdateProfile = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    let data = await updateProfile(username, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="user-infor-container">
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">
            {t("admin.manage-user.modal.username")}
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            {t("admin.manage-user.modal.role")}
          </label>
          <select
            className="form-select "
            value={role}
            onChange={(event) => setRole(event.target.value)}
            disabled
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label lable-upload" htmlFor="labelUpload">
            <FcPlus /> {t("admin.manage-user.modal.u-image")}
          </label>
          <input
            type="file"
            id="labelUpload"
            hidden
            onChange={(event) => {
              handleUploadImage(event);
            }}
          />
        </div>
        <div className="col-md-12 img-preview">
          {previewImage ? (
            <img src={previewImage} />
          ) : (
            <span>{t("admin.manage-user.modal.p-image")}</span>
          )}
        </div>
        <div className="mt-3">
          <button
            className="btn btn-warning"
            onClick={() => handleUpdateProfile()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfor;
