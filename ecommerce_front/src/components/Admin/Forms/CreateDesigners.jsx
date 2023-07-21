import React, { useState } from "react";
import { postDesigners } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateDesigners = (setIsOpen) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const handleSubmitDesigners = (e) => {
    e.preventDefault();
    dispatch(postDesigners(input));
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
      <h3>Create Designers</h3>
      <form onSubmit={(e) => handleSubmitDesigners(e)}>
        <input
          className="inputs"
          type="text"
          placeholder="Designers"
          onChange={handleChange}
          name="designer_name"
        />
        <button className="submit-button-modal" type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
