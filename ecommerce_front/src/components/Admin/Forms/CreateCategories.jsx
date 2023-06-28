import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import {
  postAuthors,
  postCategories,
  postDesigners,
  postEditorials,
  postLanguages,
  postMechanics,
  postThematics,
} from "../../../Redux/actions_creators";

export const CreateCategories = (setIsOpen) => {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const handleSubmitCategories = (e) => {
    e.preventDefault();
    dispatch(postCategories(input));
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
        <div>
          <h3>Create Category</h3>
          <form onSubmit={(e) => handleSubmitCategories(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Categories"
              onChange={handleChange}
              name="category_name"
            />
            <button className="submit-button-modal" type="submit">
              Create
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
