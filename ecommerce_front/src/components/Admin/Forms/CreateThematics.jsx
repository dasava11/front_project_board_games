import React, { useState } from "react";
import { postThematics } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateThematics = (setIsOpen) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const handleSubmitThematics = (e) => {
    e.preventDefault();
    dispatch(postThematics(input));
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
    <>
      <Modal
        open={setIsOpen.isOpen}
        title="Create Information"
        onCancel={setIsOpen.setIsOpen}
        footer={[<button key="Guardar" onClick={handleOk}></button>]}
      >
        <h3>Create Thematic</h3>
        <form onSubmit={(e) => handleSubmitThematics(e)}>
          <input
            className="inputs"
            type="text"
            placeholder="Thematic"
            onChange={handleChange}
            name="thematic_name"
          />
          <button className="submit-button-modal" type="submit">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};
