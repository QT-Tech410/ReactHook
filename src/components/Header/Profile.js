import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserInfor from "./UserInfor";
import ChangePassword from "./ChangePassword";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab className="p-3 pt-0" eventKey="home" title="User Information">
              <UserInfor />
            </Tab>
            <Tab
              className="p-3 pt-0"
              eventKey="profile"
              title="Change Password"
            >
              <ChangePassword />
            </Tab>
            <Tab className="p-3 pt-0" eventKey="contact" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
