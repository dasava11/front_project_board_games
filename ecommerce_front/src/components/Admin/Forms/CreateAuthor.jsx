import React, { useState } from "react";

import { postAuthors } from "../../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateAuthor = (setIsOpen) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const handleSubmitAuthors = (e) => {
    e.preventDefault();
    dispatch(postAuthors(input));
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
        onOk={handleOk}
        onCancel={setIsOpen.setIsOpen}
        footer={""}
      >
        <h3>Create Authors</h3>
        <form onSubmit={(e) => handleSubmitAuthors(e)}>
          <input
            className="inputs"
            type="text"
            placeholder="Authors"
            onChange={handleChange}
            name="author_name"
          />
          <button className="submit-button-modal" type="submit">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};
