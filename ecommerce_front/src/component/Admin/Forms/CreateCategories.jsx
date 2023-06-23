import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  postAuthors,
  postCategories,
  postDesigners,
  postEditorials,
  postLanguages,
  postMechanics,
  postThematics,
} from "../../../Redux/actions_creators";
export const CreateCategories = () => {
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

  return (
    <div>
      <form onSubmit={(e) => handleSubmitCategories(e)}>
        <input
          type="text"
          placeholder="Categories"
          onChange={handleChange}
          name="category_name"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitThematics(e)}>
        <input
          type="text"
          placeholder="Thematic"
          onChange={handleChange}
          name="thematic_name"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitAuthors(e)}>
        <input
          type="text"
          placeholder="Author"
          onChange={handleChange}
          name="author_name"
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={handleChange}
          name="nationality"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitDesigners(e)}>
        <input
          type="text"
          placeholder="Designers"
          onChange={handleChange}
          name="designer_name"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitEditorials(e)}>
        <input
          type="text"
          placeholder="Editorial"
          onChange={handleChange}
          name="editorial_name"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitLanguages(e)}>
        <input
          type="text"
          placeholder="Languages"
          onChange={handleChange}
          name="language_name"
        />
        <input type="submit" />
      </form>
      <form onSubmit={(e) => handleSubmitMechanics(e)}>
        <input
          type="text"
          placeholder="Mechanic"
          onChange={handleChange}
          name="mechanic_name"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
        />
        <input type="submit" />
      </form>
    </div>
  );
};
