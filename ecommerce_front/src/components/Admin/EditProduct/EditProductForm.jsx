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
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  const filteredCategories = categories.filter(
    (cat) =>
      !product.Categories?.some(
        (pcat) => pcat.category_name === cat.category_name
      )
  );
  const designers = useSelector((state) => state.allDesigners);
  const filteredDesigners = designers.filter(
    (des) =>
      !product.Designers?.some(
        (pdes) => pdes.designer_name === des.designer_name
      )
  );
  const languages = useSelector((state) => state.allLanguages);
  const filteredLanguages = languages.filter(
    (lan) =>
      !product.Languages?.some(
        (plan) => plan.language_name === lan.language_name
      )
  );
  const mechanics = useSelector((state) => state.allMechanics);
  const filteredMechanics = mechanics.filter(
    (mechanic) => mechanic.mechanic_name !== product.Mechanic?.mechanic_name
  );
  const thematics = useSelector((state) => state.allThematics);
  const filteredTematics = thematics.filter(
    (thematic) => thematic.thematic_name !== product.Thematic?.thematic_name
  );

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
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      game_id: product.game_id,
      author_name: product.Author.author_name,
      editorial_name: product.Editorial.editorial_name,
      categories_name: product.Categories.map((cat) => cat.category_name),
      designers_name: product.Designers.map((des) => des.designer_name),
      mechanics_name: product.Mechanics.map((mec) => mec.mechanic_name),
      thematics_name: product.Thematics.map((t) => t.thematic_name),
      languages_name: product.Languages.map((lan) => lan.language_name),
    };

    await axios
      .put(
        "https://backprojectboardgames-production.up.railway.app/games",
        newProduct
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => {
        console.log(err);
      });
    setProduct({ [e.target.name]: "" });
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
      setProduct({ ...product, Author: { author_name: value } });
    } else if (name === "editorial_name") {
      setProduct({
        ...product,
        Editorial: { editorial_name: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleChangeCategories = (values) => {
    setProduct((product) => ({
      ...product,
      Categories: [
        ...product.Categories,
        ...values.map((cat) => ({ category_name: cat })),
      ],
    }));
  };

  const handleChangeDesigners = (values) => {
    setProduct((product) => ({
      ...product,
      Designers: [
        ...product.Designers,
        ...values.map((des) => ({ designer_name: des })),
      ],
    }));
  };

  const handleChangeLanguages = (values) => {
    setProduct((product) => ({
      ...product,
      Languages: [
        ...product.Languages,
        ...values.map((lan) => ({ language_name: lan })),
      ],
    }));
  };
  const handleChangeThematic = (values) => {
    setProduct((product) => ({
      ...product,
      Thematics: [
        ...product.Thematics,
        ...values.map((t) => ({ thematic_name: t })),
      ],
    }));
  };

  const handleChangeMechanic = (values) => {
    setProduct((product) => ({
      ...product,
      Mechanics: [
        ...product.Mechanics,
        ...values.map((m) => ({ mechanic_name: m })),
      ],
    }));
  };

  const handleDelete = (e) => {
    if (e.target.name === "category_name") {
      let newCat = product.Categories.filter(
        (cat) => cat.category_name !== e.target.value
      );
      setProduct({ ...product, Categories: newCat });
    }
    if (e.target.name === "designer_name") {
      let newDes = product.Designers.filter(
        (des) => des.designer_name !== e.target.value
      );
      setProduct({ ...product, Designers: newDes });
    }
    if (e.target.name === "language_name") {
      let newLan = product.Languages.filter(
        (lan) => lan.language_name !== e.target.value
      );
      setProduct({ ...product, Languages: newLan });
    }
    if (e.target.name === "mechanics_name") {
      let newMech = product.Mechanics.filter(
        (mec) => mec.mechanic_name !== e.target.value
      );
      setProduct({ ...product, Mechanics: newMech });
    }
    if (e.target.name === "thematic_name") {
      let newThem = product.Thematics.filter(
        (t) => t.thematic_name !== e.target.value
      );
      setProduct({ ...product, Thematics: newThem });
    }
    if (e.target.name === "image") {
      let newImage = product.image.filter((i) => i.image !== e.target.alt);
      setProduct({ ...product, image: newImage });
    }
  };

  const handleSwitchOnSale = async (game_id) => {
    await axios
      .put(
        `https://backprojectboardgames-production.up.railway.app/games/${game_id}`
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <div className={style.mainContainer}>
        <h1>Edit Product</h1>
        <div className={style.buttonEdition}>
          {product.active === true ? (
            <div className={style.switchButton}>
              <h6>Deactivate product</h6>
              <Switch
                checked
                onChange={() => {
                  handleSwitch(product.game_id);
                }}
              />
            </div>
          ) : (
            <div className={style.switchButton}>
              <h6>Activate product</h6>
              <Switch
                checked={false}
                onChange={() => {
                  handleSwitch(product.game_id);
                }}
              />
            </div>
          )}
          <br />
          {product.on_sale === true ? (
            <div className={style.switchButton}>
              <h6>Deactivate OnSale</h6>
              <Switch
                checked
                onChange={() => {
                  handleSwitchOnSale(product.game_id);
                }}
              />
            </div>
          ) : (
            <div className={style.switchButton}>
              <h6>Activate OnSale</h6>
              <Switch
                checked={false}
                onChange={() => {
                  handleSwitchOnSale(product.game_id);
                }}
              />
            </div>
          )}
        </div>

        {product && (
          <form className={style} onSubmit={handleSubmit}>
            <label className={style.labels}>Game Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Date released (YYYY/MM/DD)</label>
            <input
              name="released"
              value={product.released?.substring(0, 10)}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Price U$D</label>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Recommended Age</label>
            <input
              name="age"
              value={product.age}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Quantity min players</label>
            <input
              name="players_min"
              value={product.players_min}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Quantity max players</label>
            <input
              name="playes_max"
              value={product.players_max}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Stock </label>
            <input
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels} htmlFor="image">
              Image
            </label>
            {product.image &&
              product.image?.map((i) => (
                <>
                  <button
                    type="button"
                    key={product.image}
                    value={product.image}
                    name="image"
                  >
                    X
                  </button>
                  <img
                    width={"100px"}
                    src={i}
                    alt={i}
                    onClick={(e) => handleDelete(e)}
                  />
                </>
              ))}
            <span
              className={style.buttonCloudinary}
              onClick={() => showUploadWidget(product, setProduct)}
            >
              Upload Image
            </span>
            <br />
            <label className={style.labels}>Box weight</label>
            <input
              name="weight"
              value={product.weight}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Estimated playing time</label>
            <input
              name="playing_time"
              value={product.playing_time}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Author</label>
            <input
              name="author_name"
              value={product.Author?.author_name}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Categories</label>
            <Select
              mode="multiple"
              onChange={handleChangeCategories}
              name="category_name"
              style={{
                width: "100%",
                margin: "0.5rem",
                fontSize: "medium",
                height: "33px",
              }}
              placeholder="Select categories"
            >
              {filteredCategories &&
                filteredCategories.map((cat) => {
                  return (
                    <>
                      <Option key={cat.category_name} value={cat.category_name}>
                        {cat.category_name}
                      </Option>
                    </>
                  );
                })}
            </Select>
            {product.Categories &&
              product.Categories?.map((cat) => (
                <>
                  <button
                    type="button"
                    className={style.subInputEdit}
                    key={cat.category_name}
                    value={cat.category_name}
                    name="category_name"
                    onClick={(e) => handleDelete(e)}
                  >
                    {cat.category_name}X
                  </button>
                </>
              ))}
            <label className={style.labels}>Designers</label>
            <Select
              mode="multiple"
              onChange={(values) => handleChangeDesigners(values)}
              name="designer_name"
              style={{
                width: "100%",
                margin: "0.5rem",
                fontSize: "medium",
                height: "33px",
              }}
              placeholder="Select Designer"
            >
              {filteredDesigners &&
                filteredDesigners.map((des) => {
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
                  <button
                    type="button"
                    className={style.subInputEdit}
                    key={des.designer_name}
                    value={des.designer_name}
                    name="designer_name"
                    onClick={(e) => handleDelete(e)}
                  >
                    {des.designer_name}X
                  </button>
                </>
              ))}
            <label className={style.labels}>Editorial</label>
            <input
              name="editorial_name"
              value={product.Editorial?.editorial_name}
              onChange={handleChange}
              className={style.inputEdit}
            />
            <label className={style.labels}>Languages</label>
            <Select
              mode="multiple"
              onChange={(values) => handleChangeLanguages(values)}
              name="language_name"
              style={{
                width: "100%",
                margin: "0.5rem",
                fontSize: "medium",
                height: "33px",
              }}
              placeholder="Select Language"
            >
              {filteredLanguages &&
                filteredLanguages.map((lan) => {
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
                  <button
                    type="button"
                    className={style.subInputEdit}
                    key={lan.language_name}
                    value={lan.language_name}
                    name="language_name"
                    onClick={(e) => handleDelete(e)}
                  >
                    {lan.language_name}X
                  </button>
                </>
              ))}
            <label className={style.labels}>Mechanic</label>
            <Select
              mode="multiple"
              onChange={(values) => handleChangeMechanic(values)}
              name="mechanics_name"
              style={{
                width: "100%",
                margin: "0.5rem",
                fontSize: "medium",
                height: "33px",
              }}
              placeholder="Select Mechanic"
            >
              {filteredMechanics &&
                filteredMechanics.map((mec) => {
                  return (
                    <Option key={mec.mechanic_name} value={mec.mechanic_name}>
                      {mec.mechanic_name}
                    </Option>
                  );
                })}
            </Select>
            {product.Mechanics &&
              product.Mechanics?.map((mec) => (
                <>
                  <button
                    type="button"
                    className={style.subInputEdit}
                    key={mec.mechanic_name}
                    value={mec.mechanic_name}
                    name="mechanics_name"
                    onClick={(e) => handleDelete(e)}
                  >
                    {mec.mechanic_name}X
                  </button>
                </>
              ))}
            <label className={style.labels}>Thematic</label>
            <Select
              mode="multiple"
              onChange={(values) => handleChangeThematic(values)}
              name="thematic_name"
              style={{
                width: "100%",
                margin: "0.5rem",
                fontSize: "medium",
                height: "33px",
              }}
              placeholder="Select Thematic"
            >
              {filteredTematics &&
                filteredTematics.map((them) => {
                  return (
                    <Option key={them.thematic_name} value={them.thematic_name}>
                      {them.thematic_name}
                    </Option>
                  );
                })}
            </Select>
            {product.Thematics &&
              product.Thematics?.map((t) => (
                <>
                  <button
                    type="button"
                    className={style.subInputEdit}
                    key={t.thematic_name}
                    value={t.thematic_name}
                    name="thematic_name"
                    onClick={(e) => handleDelete(e)}
                  >
                    {t.thematic_name}X
                  </button>
                </>
              ))}
            <button type="submit" className={style.sendButton}>
              Send changes
            </button>
          </form>
        )}
      </div>
    </>
  );
};
