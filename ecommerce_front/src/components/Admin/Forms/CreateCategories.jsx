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
  const handleSubmitThematics = (e) => {
    e.preventDefault();
    dispatch(postThematics(input));
    e.target.reset();
  };
  const handleSubmitAuthors = (e) => {
    e.preventDefault();
    dispatch(postAuthors(input));
    e.target.reset();
  };
  const handleSubmitDesigners = (e) => {
    e.preventDefault();
    dispatch(postDesigners(input));
    e.target.reset();
  };
  const handleSubmitEditorials = (e) => {
    e.preventDefault();
    dispatch(postEditorials(input));
    e.target.reset();
  };
  const handleSubmitLanguages = (e) => {
    e.preventDefault();
    dispatch(postLanguages(input));
    e.target.reset();
  };
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
    <>
      <Modal
        open={setIsOpen.isOpen}
        title="Create Information"
        onOk={handleOk}
        onCancel={setIsOpen.setIsOpen}
        footer={[<button key="Guardar" onClick={handleOk}></button>]}
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
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Thematic</h3>
          <form onSubmit={(e) => handleSubmitThematics(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Thematic"
              onChange={handleChange}
              name="thematic_name"
            />
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Author</h3>
          <form onSubmit={(e) => handleSubmitAuthors(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Author"
              onChange={handleChange}
              name="author_name"
            />
            <input
              className="inputs"
              type="text"
              placeholder="Nationality"
              onChange={handleChange}
              name="nationality"
            />
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Designer</h3>
          <form onSubmit={(e) => handleSubmitDesigners(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Designers"
              onChange={handleChange}
              name="designer_name"
            />
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Editorial</h3>
          <form onSubmit={(e) => handleSubmitEditorials(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Editorial"
              onChange={handleChange}
              name="editorial_name"
            />
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Languages</h3>
          <form onSubmit={(e) => handleSubmitLanguages(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Languages"
              onChange={handleChange}
              name="language_name"
            />
            <input className="submit-button" type="submit" />
          </form>
          <h3>Create Mechanic</h3>
          <form onSubmit={(e) => handleSubmitMechanics(e)}>
            <input
              className="inputs"
              type="text"
              placeholder="Mechanic"
              onChange={handleChange}
              name="mechanic_name"
            />
            <input
              className="inputs"
              type="text"
              placeholder="Description"
              onChange={handleChange}
              name="description"
            />
            <input className="submit-button" type="submit" />
          </form>
        </div>
      </Modal>
    </>
  );
};
