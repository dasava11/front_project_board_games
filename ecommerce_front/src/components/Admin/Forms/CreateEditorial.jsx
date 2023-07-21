import React, { useState } from "react";
import { postEditorials } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateEditorial = (setIsOpen) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const handleSubmitEditorial = (e) => {
    e.preventDefault();
    dispatch(postEditorials(input));
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
      <h3>Create Editorial</h3>
      <form onSubmit={(e) => handleSubmitEditorial(e)}>
        <input
          className="inputs"
          type="text"
          placeholder="Editorial"
          onChange={handleChange}
          name="editorial_name"
        />
        <button className="submit-button-modal" type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
