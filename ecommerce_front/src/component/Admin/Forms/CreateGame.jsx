import { useState, useEffect } from "react";
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
import "./creategames.css";

export default function CreateGame() {
  const [input, setInput] = useState({});

  const authors = useSelector((state) => state.allAuthors);
  const categories = useSelector((state) => state.allCategories);
  const editorials = useSelector((state) => state.allEditorials);
  const designers = useSelector((state) => state.allDesigners);
  const mechanics = useSelector((state) => state.allMechanics);
  const thematics = useSelector((state) => state.allThematics);
  const languages = useSelector((state) => state.allLanguages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthors());
    dispatch(getCategories());
    dispatch(getDesigners());
    dispatch(getEditorials());
    dispatch(getLanguages());
    dispatch(getMechanics());
    dispatch(getThematics());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setInput({
      name: "",
      released: "",
      price: 0,
      age: "",
      players_min: "",
      players_max: "",
      rating: [],
      stock: 0,
      active: true,
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
  console.log(authors);
  return (
    <div className="form-maincontainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Released"
          name="released"
          value={input.released}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={input.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Age"
          name="age"
          value={input.age}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Players Min"
          name="players_min"
          value={input.players_min}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Players Max"
          name="players_max"
          value={input.players_max}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Rating"
          name="rating"
          value={input.rating}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={input.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Active"
          name="active"
          value={input.active}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Image"
          name="image"
          value={input.image}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Weight"
          name="weight"
          value={input.weight}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Playing time"
          name="playingtime"
          value={input.playing_time}
          onChange={handleChange}
        />
        <select onChange={handleChange} name="authors">
          Authors
          <option defaultValue>Select an author</option>
          {authors &&
            authors.map((aut) => {
              return (
                <option key={aut.author_name} value={aut.author_name}>
                  {aut.author_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="categories">
          Categories
          <option defaultValue>Select category</option>
          {categories &&
            categories.map((cat) => {
              return (
                <option key={cat.category_name} value={cat.category_name}>
                  {cat.category_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="designers">
          Designers
          <option defaultValue>Select designer</option>
          {designers &&
            designers.map((des) => {
              return (
                <option key={des.designer_name} value={des.designer_name}>
                  {des.designer_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="editorial">
          Editorial
          <option defaultValue>Select editorial</option>
          {editorials &&
            editorials.map((edit) => {
              return (
                <option key={edit.editorial_name} value={edit.editorial_name}>
                  {edit.editorial_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="mechanic">
          Mechanics
          <option defaultValue>Select mechanic</option>
          {mechanics &&
            mechanics.map((mec) => {
              return (
                <option key={mec.mechanic_name} value={mec.mechanic_name}>
                  {mec.mechanic_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="thematic">
          Thematics
          <option defaultValue>Select thematic</option>
          {thematics &&
            thematics.map((them) => {
              return (
                <option key={them.thematic_name} value={them.thematic_name}>
                  {them.thematic_name}
                </option>
              );
            })}
        </select>
        <select onChange={handleChange} name="thematic">
          Lenguages
          <option defaultValue>Select lenguage</option>
          {languages &&
            languages.map((len) => {
              return (
                <option key={len.language_name} value={len.language_name}>
                  {len.language_name}
                </option>
              );
            })}
        </select>
        <input type="submit" />
      </form>
      <div className="create-categories-container">
        <CreateCategories />
      </div>
    </div>
  );
}
