import { useState, useEffect } from "react";
//import { postGames } from "../../../Redux/actions_creators/index";
import validations from "./validations";
import { CreateCategories } from "./CreateCategories";
import {
  getAuthors,
  getCategories,
  getDesigners,
  getEditorials,
  getLanguages,
  getMechanics,
  getThematics,
} from "../../../Redux/actions_creators/index";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import "./creategames.css";
const { Option } = Select;

export default function CreateGame() {
  const {
    allAuthors,
    allCategories,
    allEditorials,
    allDesigners,
    allMechanics,
    allThematics,
    allLanguages,
  } = useSelector((state) => state);

  const [input, setInput] = useState({});
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthors());
    dispatch(getCategories());
    dispatch(getDesigners());
    dispatch(getEditorials());
    dispatch(getLanguages());
    dispatch(getMechanics());
    dispatch(getThematics());
  }, [dispatch]);

  const handleModalCreate = () => {
    setModal(modal === true ? false : true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validations(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(postGames(input));
    setInput({
      name: "",
      released: "",
      price: 0,
      age: "",
      players_min: "",
      players_max: "",
      stock: 0,
      image: [],
      weight: "",
      playing_time: 0,
      Author: [],
      Categories: [],
      Designers: [],
      Editorial: [],
      Mechanic: [],
      Thematic: [],
    });
    e.target.reset();
  };

  return (
    <>
      <div className="maincontainer">
        <h2 className="title-form">Create Product</h2>
      </div>

      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <input
            className="inputs"
            type="text"
            placeholder="Game name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
          <input
            className="inputs"
            type="text"
            placeholder="Released"
            name="released"
            value={input.released}
            onChange={handleChange}
          />
          {errors.released && <span>{errors.released}</span>}
          <input
            className="inputs"
            type="number"
            placeholder="Price"
            name="price"
            value={input.price}
            onChange={handleChange}
            step=".01"
            min={0}
          />
          {errors.price && <span>{errors.price}</span>}
          <input
            className="inputs"
            type="text"
            placeholder="Age"
            name="age"
            value={input.age}
            onChange={handleChange}
            min={0}
          />
          {errors.age && <span>{errors.age}</span>}
          <input
            className="inputs"
            type="text"
            placeholder="Players Min"
            name="players_min"
            value={input.players_min}
            onChange={handleChange}
            min={0}
          />
          {errors.players_min && <span>{errors.players_min}</span>}
          <input
            className="inputs"
            type="text"
            placeholder="Players Max"
            name="players_max"
            value={input.players_max}
            onChange={handleChange}
            min={0}
          />
          {errors.players_max && <span>{errors.players_max}</span>}
          <input
            className="inputs"
            type="number"
            placeholder="Stock"
            name="stock"
            value={input.stock}
            onChange={handleChange}
            min={0}
          />
          {errors.stock && <span>{errors.stock}</span>}
          <input
            className="inputs"
            type="text"
            placeholder="Image"
            name="image"
            value={input.image}
            onChange={handleChange}
          />

          <input
            className="inputs"
            type="number"
            placeholder="Weight"
            name="weight"
            value={input.weight}
            onChange={handleChange}
            step=".01"
            min={0}
          />
          {errors.weight && <span>{errors.weight}</span>}
          <input
            className="inputs"
            type="number"
            placeholder="Playing time"
            name="playingtime"
            value={input.playing_time}
            onChange={handleChange}
            min={0}
          />
          {errors.playing_time && <span>{errors.playing_time}</span>}
          <Select
            mode="multiple"
            onChange={handleChange}
            name="authors"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
            placeholder="Select authors"
          >
            {allAuthors &&
              allAuthors.map((aut) => {
                return (
                  <Option key={aut.author_name} value={aut.author_name}>
                    {aut.author_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create authors
          </button>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="categories"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
            placeholder="Select categories"
          >
            {allCategories &&
              allCategories.map((cat) => {
                return (
                  <Option key={cat.category_name} value={cat.category_name}>
                    {cat.category_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Categories
          </button>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="designers"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
            placeholder="Select designers"
          >
            {allDesigners &&
              allDesigners.map((des) => {
                return (
                  <Option key={des.designer_name} value={des.designer_name}>
                    {des.designer_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Designers
          </button>
          <Select
            mode="multiple"
            name="editorial"
            onChange={handleChange}
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
            placeholder="Select editorials"
          >
            {allEditorials &&
              allEditorials.map((edit) => {
                return (
                  <Option key={edit.editorial_name} value={edit.editorial_name}>
                    {edit.editorial_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Editorials
          </button>
          <Select
            onChange={handleChange}
            name="mechanic"
            mode="multiple"
            placeholder="Select mechanics"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
          >
            {allMechanics &&
              allMechanics.map((mec) => {
                return (
                  <Option key={mec.mechanic_name} value={mec.mechanic_name}>
                    {mec.mechanic_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Mechanics
          </button>
          <Select
            onChange={handleChange}
            name="thematic"
            mode="multiple"
            placeholder="Select thematics"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
            }}
          >
            {allThematics &&
              allThematics.map((them) => {
                return (
                  <Option key={them.thematic_name} value={them.thematic_name}>
                    {them.thematic_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Thematics
          </button>
          <Select
            onChange={handleChange}
            name="thematic"
            mode="multiple"
            placeholder="Select thematics"
            style={{
              width: "30%",
              margin: "0.5rem",
              boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.4)",
              fontSize: "medium",
              borderRadius: "8px",
            }}
          >
            {allLanguages &&
              allLanguages.map((len) => {
                return (
                  <Option key={len.language_name} value={len.language_name}>
                    {len.language_name}
                  </Option>
                );
              })}
          </Select>
          <button className="create-button" onClick={handleModalCreate}>
            Create Languages
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <CreateCategories setIsOpen={handleModalCreate} isOpen={modal} />
      </div>
    </>
  );
}
