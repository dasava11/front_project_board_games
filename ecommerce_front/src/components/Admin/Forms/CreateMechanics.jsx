import React from "react";
import { postMechanics } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateMechanics = (setIsOpen) => {
  const dispatch = useDispatch();

  const handleSubmitMechanics = (e) => {
    e.preventDefault();
    dispatch(postMechanics(input));
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
      onOk={handleOk}
      onCancel={setIsOpen.setIsOpen}
      footer={""}
    >
      <h3>Create Mechanics</h3>
      <form onSubmit={(e) => handleSubmitMechanics(e)}>
        <input
          className="inputs"
          type="text"
          placeholder="Mechanics"
          onChange={handleChange}
          name="mechanic_name"
        />
        <button className="submit-button-modal" type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
