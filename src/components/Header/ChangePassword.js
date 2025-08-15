import React, { useState, useRef, useCallback } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../services/apiService";

const ChangePassword = () => {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] =
    useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitChangePass = async () => {
    let data = await changePassword(currentPassword, newPassword);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  // return (
  //   <div className="change-password-container">
  //     <div className="pass-group col-md-6 ">
  //       <label>Current Password (*)</label>
  //       <input
  //         type={isShowCurrentPassword ? "text" : "password"}
  //         value={currentPassword}
  //         onChange={(event) => setcurrentPassword(event.target.value)}
  //         className="form-control"
  //       />
  //       {isShowCurrentPassword ? (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowCurrentPassword(false)}
  //         >
  //           <VscEye />
  //         </span>
  //       ) : (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowCurrentPassword(true)}
  //         >
  //           <VscEyeClosed />
  //         </span>
  //       )}
  //     </div>
  //     <div className="pass-group col-md-6 mt-3">
  //       <label>New Password (*)</label>
  //       <input
  //         type={isShowNewPassword ? "text" : "password"}
  //         value={newPassword}
  //         onChange={(event) => setNewPassword(event.target.value)}
  //         className="form-control"
  //       />
  //       {isShowNewPassword ? (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowNewPassword(false)}
  //         >
  //           <VscEye />
  //         </span>
  //       ) : (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowNewPassword(true)}
  //         >
  //           <VscEyeClosed />
  //         </span>
  //       )}
  //     </div>
  //     <div className="pass-group col-md-6 mt-3">
  //       <label>Confirm New Password (*)</label>
  //       <input
  //         type={isShowConfirmNewPassword ? "text" : "password"}
  //         value={confirmPassword}
  //         onChange={(event) => setConfirmPassword(event.target.value)}
  //         className="form-control"
  //       />
  //       {isShowConfirmNewPassword ? (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowConfirmNewPassword(false)}
  //         >
  //           <VscEye />
  //         </span>
  //       ) : (
  //         <span
  //           className="icons-eye"
  //           onClick={() => setIsShowConfirmNewPassword(true)}
  //         >
  //           <VscEyeClosed />
  //         </span>
  //       )}
  //     </div>
  //     <div className="mt-3">
  //       <button
  //         className="btn btn-warning"
  //         onClick={() => handleSubmitChangePass()}
  //       >
  //         Update
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit(handleSubmitChangePass)}>
        {/* Current Password */}
        <div className="pass-group col-md-6">
          <label>Current Password (*)</label>
          <div className="input-wrapper">
            <input
              type={isShowCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control "
            />
            <span
              className="icons-eye"
              onClick={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
            >
              {isShowCurrentPassword ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className="pass-group col-md-6 mt-3">
          <label>New Password (*)</label>
          <div className="input-wrapper">
            <input
              type={isShowNewPassword ? "text" : "password"}
              value={newPassword}
              {...register("newPassword", {
                required: "New password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must have at least 8 characters, including uppercase, lowercase, number, and special character",
                },
              })}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
            <span
              className="icons-eye"
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            >
              {isShowNewPassword ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-danger mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="pass-group col-md-6 mt-3">
          <label>Confirm New Password (*)</label>
          <div className="input-wrapper">
            <input
              type={isShowConfirmNewPassword ? "text" : "password"}
              value={confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            />
            <span
              className="icons-eye"
              onClick={() =>
                setIsShowConfirmNewPassword(!isShowConfirmNewPassword)
              }
            >
              {isShowConfirmNewPassword ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-danger mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="mt-3">
          <button className="btn btn-warning" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
