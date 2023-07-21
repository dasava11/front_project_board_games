import React, { useState } from "react";
import { postLanguages } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateLanguage = (setIsOpen) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const handleSubmitLanguage = (e) => {
    e.preventDefault();
    dispatch(postLanguages(input));
    e.target.reset();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleOk = () => {
    console.log("hola");
  };
  return (
    <Modal
      open={setIsOpen.isOpen}
      title="Create Information"
      onCancel={setIsOpen.setIsOpen}
      footer={""}
    >
      <h3>Create Language</h3>
      <form onSubmit={(e) => handleSubmitLanguage(e)}>
        <input
          className="inputs"
          type="text"
          placeholder="Language"
          onChange={handleChange}
          name="language_name"
        />
        <button className="submit-button-modal" type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
