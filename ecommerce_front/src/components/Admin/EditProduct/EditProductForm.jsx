import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showUploadWidget } from "../Cloudinary/Cloudinary";
import { Switch } from "antd";
import style from "./editform.module.css";
import axios from "axios";
import { Select } from "antd";
import {
  getCategories,
  getDesigners,
  getLanguages,
  getMechanics,
  getThematics,
} from "../../../Redux/actions_creators";
import { toast } from "react-toastify";

const { Option } = Select;

export const EditProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  const designers = useSelector((state) => state.allDesigners);
  const mechanics = useSelector((state) => state.allMechanics);
  const thematics = useSelector((state) => state.allThematics);
  const languages = useSelector((state) => state.allLanguages);
  // const filteredCategories = categories.filter(
  //   (c) => c.category_name ==

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDesigners());
    dispatch(getMechanics());
    dispatch(getThematics());
    dispatch(getLanguages());
    axios
      .get(
        `https://backprojectboardgames-production.up.railway.app/games/id/${id}`
      )
      .then((res) => setProduct(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      "https://backprojectboardgames-production.up.railway.app/games",
      product
    );
  };

  const handleSwitch = async (game_id) => {
    await axios
      .put(
        `https://backprojectboardgames-production.up.railway.app/games/delete/${game_id}`
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "author_name") {
      setProduct({
        ...product,
        Author: { ...product.Author, author_name: value },
      });
    } else if (name === "editorial_name") {
      setProduct({
        ...product,
        Editorial: { ...product.Editorial, editorial_name: value },
      });
    } else if (name === "thematic_name") {
      setProduct({
        ...product,
        Thematic: { ...product.Thematic, thematic_name: value },
      });
    } else if (name === "mechanic_name") {
      setProduct({
        ...product,
        Mechanic: { ...product.Mechanic, mechanic_name: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  const handleDelete = () => {};
  console.log(product);
  return (
    <div>
      <Switch
        defaultChecked={product.active}
        onChange={() => {
          handleSwitch(product.game_id);
        }}
      />
      {product && (
        <form className={style} onSubmit={handleSubmit}>
          <label>Game Name</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Date released (YYYY/MM/DD)</label>
          <input
            name="released"
            value={product.released?.substring(0, 10)}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Price U$D</label>
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Recommended Age</label>
          <input
            name="age"
            value={product.age}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Quantity min players</label>
          <input
            name="players_min"
            value={product.players_min}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Quantity max players</label>
          <input
            name="playes_max"
            value={product.players_max}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Stock </label>
          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>On Sale?</label>
          <input
            name="on_sale"
            value={product.on_sale}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label htmlFor="image">Image</label>

          {Array.isArray(product.image) ? (
            product.image?.map((i) => (
              <>
                <button key={product.name} onClick={handleDelete}>
                  x
                </button>
                <img width={"100px"} src={i} />
              </>
            ))
          ) : (
            <>
              <button key={product.name} onClick={handleDelete}>
                x
              </button>
              <img width={"100px"} src={product.image?.url} />
            </>
          )}
          <button
            className={style.buttonCloudinary}
            onClick={() => showUploadWidget(product, setProduct)}
          >
            Upload Image
          </button>

          {product.image > 0 && <h2>Imagen cargada correctamente</h2>}
          <label>Box weight</label>
          <input
            name="weight"
            value={product.weight}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Estimated playing time</label>
          <input
            name="playing_time"
            value={product.playing_time}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Author</label>
          <input
            name="author_name"
            value={product.Author?.author_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Categories</label>
          <Select
            mode="multiple"
            //onChange={}
            name="categories_name"
            style={{
              width: "100%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select categories"
          >
            {categories &&
              categories.map((cat) => {
                return (
                  <Option key={cat.category_name} value={cat.category_name}>
                    {cat.category_name}
                  </Option>
                );
              })}
          </Select>
          {product.Categories &&
            product.Categories?.map((cat) => (
              <>
                <span
                  className={style.inputEdit}
                  key={cat.category_name}
                  value={cat.category_name}
                  name="category_name"
                  onChange={handleChange}
                >
                  {cat.category_name}
                </span>
                <span className={style.deleteButton} onClick={handleDelete}>
                  x
                </span>
              </>
            ))}

          <label>Designers</label>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="designer_name"
            style={{
              width: "100%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select Designer"
          >
            {designers &&
              designers.map((des) => {
                return (
                  <Option key={des.designer_name} value={des.designer_name}>
                    {des.designer_name}
                  </Option>
                );
              })}
          </Select>
          {product.Designers &&
            product.Designers?.map((des) => (
              <>
                <span
                  className={style.inputEdit}
                  key={des.designer_name}
                  value={des.designer_name}
                  name="designer_name"
                  // onChange={handleChange}
                >
                  {des.designer_name}
                </span>
                <span className={style.deleteButton} onClick={handleDelete}>
                  x
                </span>
              </>
            ))}
          <label>Editorial</label>
          <input
            name="editorial_name"
            value={product.Editorial?.editorial_name || ""}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Languages</label>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="language_name"
            style={{
              width: "100%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select Language"
          >
            {languages &&
              languages.map((lan) => {
                return (
                  <Option key={lan.language_name} value={lan.language_name}>
                    {lan.language_name}
                  </Option>
                );
              })}
          </Select>
          {product.Languages &&
            product.Languages?.map((lan) => (
              <>
                <span
                  className={style.inputEdit}
                  key={lan.language_name}
                  value={lan.language_name}
                  name="language_name"
                  // onChange={handleChange}
                >
                  {lan.language_name}
                </span>
                <span className={style.deleteButton} onClick={handleDelete}>
                  x
                </span>
              </>
            ))}
          <label>Mechanic</label>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="mechanic_name"
            style={{
              width: "100%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select Mechanic"
          >
            {mechanics &&
              mechanics.map((mec) => {
                return (
                  <Option key={mec.mechanic_name} value={mec.mechanic_name}>
                    {mec.mechanic_name}
                  </Option>
                );
              })}
          </Select>

          <span
            key={product.Mechanic?.mechanic_name}
            name="mechanic_name"
            value={product.Mechanic?.mechanic_name}
            // onChange={handleChange}
            className={style.inputEdit}
          >
            {product.Mechanic?.mechanic_name}
          </span>
          <span className={style.deleteButton} onClick={handleDelete}>
            x
          </span>

          <label>Thematic</label>
          <Select
            mode="multiple"
            onChange={handleChange}
            name="thematic_name"
            style={{
              width: "100%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select Thematic"
          >
            {thematics &&
              thematics.map((them) => {
                return (
                  <Option key={them.thematic_name} value={them.thematic_name}>
                    {them.thematic_name}
                  </Option>
                );
              })}
          </Select>

          <span
            key={product.Thematic?.thematic_name}
            name="thematic_name"
            value={product.Thematic?.thematic_name}
            onChange={handleChange}
            className={style.inputEdit}
          >
            {product.Thematic?.thematic_name}
          </span>
          <span className={style.deleteButton} onClick={handleDelete}>
            x
          </span>

          <button type="submit">Send changes</button>
        </form>
      )}
    </div>
  );
};
