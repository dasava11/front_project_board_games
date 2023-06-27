import { useState, useEffect } from "react";
import { postGames } from "../../../Redux/actions_creators/index";
import validations from "./validations";
import { CreateCategories } from "./CreateCategories";
import { CreateThematics } from "./CreateThematics";
import { CreateAuthor } from "./CreateAuthor";
import { CreateDesigners } from "./CreateDesigners";
import { CreateMechanics } from "./CreateMechanics";
import { CreateEditorial } from "./CreateEditorial";
import { CreateLanguage } from "./CreateLanguage";
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
  const [modalCategories, setModalCategories] = useState(false);
  const [modalThematic, setModalThematic] = useState(false);
  const [modalAuthor, setModalAuthor] = useState(false);
  const [modalDesigner, setModalDesigner] = useState(false);
  const [modalMechanic, setModalMechanic] = useState(false);
  const [modalEditorial, setModalEditorial] = useState(false);
  const [modalLanguage, setModalLanguage] = useState(false);
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

  const handleModalCreateCategories = () => {
    setModalCategories(modalCategories === true ? false : true);
  };
  const handleModalCreateThematic = () => {
    setModalThematic(modalThematic === true ? false : true);
  };
  const handleModalCreateAuthor = () => {
    setModalAuthor(modalAuthor === true ? false : true);
  };
  const handleModalCreateDesigner = () => {
    setModalDesigner(modalDesigner === true ? false : true);
  };
  const handleModalCreateMechanic = () => {
    setModalMechanic(modalMechanic === true ? false : true);
  };
  const handleModalCreateEditorial = () => {
    setModalEditorial(modalEditorial === true ? false : true);
  };
  const handleModalCreateLanguage = () => {
    setModalLanguage(modalLanguage === true ? false : true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validations(input));
  };
  const handleChangeAuthors = (value) => {
    setInput({ ...input, author_name: value });
  };
  const handleChangeCategories = (value) => {
    setInput({ ...input, categories_name: value });
  };
  const handleChangeDesigners = (value) => {
    setInput({ ...input, designers_name: value });
  };
  const handleChangeEditorial = (value) => {
    setInput({ ...input, editorial_name: value });
  };
  const handleChangeMechanics = (value) => {
    setInput({ ...input, mechanic_name: value });
  };
  const handleChangeThematics = (value) => {
    setInput({ ...input, thematic_name: value });
  };
  const handleChangeLanguages = (value) => {
    setInput({ ...input, languages_name: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postGames(input));
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
      author_name: [],
      categories_name: [],
      designers_name: [],
      editorial_name: [],
      languages_name: [],
      mechanic_name: [],
      thematic_name: [],
    });
    e.target.reset();
  };
  console.log(input);
  return (
    <>
      <div className="maincontainer">
        <h2 className="title-form">Create Product</h2>
      </div>

      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <input
            className="inputs-create"
            type="text"
            placeholder="Game name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
          <input
            className="inputs-create"
            type="date"
            placeholder="Released"
            name="released"
            value={input.released}
            onChange={handleChange}
          />
          {/* {errors.released && <span>{errors.released}</span>} */}
          <input
            className="inputs-create"
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
            className="inputs-create"
            type="text"
            placeholder="Age"
            name="age"
            value={input.age}
            onChange={handleChange}
            min={0}
          />
          {errors.age && <span>{errors.age}</span>}
          <input
            className="inputs-create"
            type="text"
            placeholder="Players Min"
            name="players_min"
            value={input.players_min}
            onChange={handleChange}
            min={0}
          />
          {errors.players_min && <span>{errors.players_min}</span>}
          <input
            className="inputs-create"
            type="text"
            placeholder="Players Max"
            name="players_max"
            value={input.players_max}
            onChange={handleChange}
            min={0}
          />
          {errors.players_max && <span>{errors.players_max}</span>}
          <input
            className="inputs-create"
            type="number"
            placeholder="Stock"
            name="stock"
            value={input.stock}
            onChange={handleChange}
            min={0}
          />
          {errors.stock && <span>{errors.stock}</span>}
          <input
            className="inputs-create"
            type="text"
            placeholder="Image"
            name="image"
            value={input.image}
            onChange={handleChange}
          />

          <input
            className="inputs-create"
            type="number"
            placeholder="Weight"
            name="weight"
            value={input.weight}
            onChange={handleChange}
            step=".01"
            min={0}
            max={10}
          />
          {errors.weight && <span>{errors.weight}</span>}
          <input
            className="inputs-create"
            type="number"
            placeholder="Playing time"
            name="playing_time"
            value={input.playing_time}
            onChange={handleChange}
            min={0}
          />
          {errors.playing_time && <span>{errors.playing_time}</span>}
          <Select
            mode="multiple"
            onChange={(value) => handleChangeAuthors(value)}
            name="author_name"
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
          <p className="create-button" onClick={handleModalCreateAuthor}>
            Create authors
          </p>
          <Select
            mode="multiple"
            onChange={(value) => handleChangeCategories(value)}
            name="categories_name"
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
          <p className="create-button" onClick={handleModalCreateCategories}>
            Create Categories
          </p>
          <Select
            mode="multiple"
            onChange={(value) => handleChangeDesigners(value)}
            name="designers_name"
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
          <p className="create-button" onClick={handleModalCreateDesigner}>
            Create Designers
          </p>
          <Select
            mode="multiple"
            name="editorial_name"
            onChange={(value) => handleChangeEditorial(value)}
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
          <p className="create-button" onClick={handleModalCreateEditorial}>
            Create Editorials
          </p>
          <Select
            onChange={(value) => handleChangeMechanics(value)}
            name="mechanic_name"
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
          <p className="create-button" onClick={handleModalCreateMechanic}>
            Create Mechanics
          </p>
          <Select
            onChange={(value) => handleChangeThematics(value)}
            name="thematic_name"
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
          <p className="create-button" onClick={handleModalCreateThematic}>
            Create Thematics
          </p>
          <Select
            onChange={(value) => handleChangeLanguages(value)}
            name="languages_name"
            mode="multiple"
            placeholder="Select Language"
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
          <p className="create-button" onClick={handleModalCreateLanguage}>
            Create Languages
          </p>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <CreateCategories
          setIsOpen={handleModalCreateCategories}
          isOpen={modalCategories}
        />
        <CreateThematics
          setIsOpen={handleModalCreateThematic}
          isOpen={modalThematic}
        />
        <CreateAuthor
          setIsOpen={handleModalCreateAuthor}
          isOpen={modalAuthor}
        />
        <CreateDesigners
          setIsOpen={handleModalCreateDesigner}
          isOpen={modalDesigner}
        />
        <CreateMechanics
          setIsOpen={handleModalCreateMechanic}
          isOpen={modalMechanic}
        />
        <CreateEditorial
          setIsOpen={handleModalCreateEditorial}
          isOpen={modalEditorial}
        />
        <CreateLanguage
          setIsOpen={handleModalCreateLanguage}
          isOpen={modalLanguage}
        />
      </div>
    </>
  );
}
