import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { opUploadWidget } from "../Cloudinary/ClodinaryEdit";
import { Switch } from "antd";
import style from "./editform.module.css";
import axios from "axios";
import validationsEdit from "./validationsEdit";
import { Select } from "antd";
import {
  getCategories,
  getDesigners,
  getLanguages,
  getMechanics,
  getThematics,
  getAuthors,
  getEditorials,
} from "../../../Redux/actions_creators";
import { toast } from "react-toastify";
import { ModifyOnSale } from "./ModifyOnSale";

const { Option } = Select;
const VITE_GET_ALL_GAMES = import.meta.env.VITE_GET_ALL_GAMES;
const VITE_URL_GAMES_DELETE = import.meta.env.VITE_URL_GAMES_DELETE;

export const EditProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  localStorage.setItem("cloud", JSON.stringify(product.image));
  const [error, setError] = useState({
    name: "",
    released: "",
    price: "",
    age: "",
    players_min: "",
    players_max: "",
    stock: "",
    weight: "",
    playing_time: "",
    image: "",
    Author: "",
    Categories: "",
    Designers: "",
    editorial: "",
    Languages: "",
    Mechanics: "",
    Thematics: "",
  });

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
  const authors = useSelector((state) => state.allAuthors);
  const filteredAuthors = authors.filter(
    (aut) => aut.author_name !== product.Author?.author_name
  );
  const editorials = useSelector((state) => state.allEditorials);
  const filteredEditorials = editorials.filter(
    (edit) => edit.editorial_name !== product.Editorial?.editorial_name
  );
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDesigners());
    dispatch(getMechanics());
    dispatch(getThematics());
    dispatch(getLanguages());
    dispatch(getAuthors());
    dispatch(getEditorials());
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
      image: JSON.parse(localStorage.getItem("cloud")),
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
    navigate("/admin/editproduct");
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError(validationsEdit(product));
  };

  const handleChangeAuthor = (value) => {
    setProduct({ ...product, Author: { author_name: value } });
    setError(validationsEdit(product));
  };
  const handleChangeEditorial = (value) => {
    setProduct({ ...product, Editorial: { editorial_name: value } });
    setError(validationsEdit(product));
  };
  const handleChangeCategories = (values) => {
    setProduct((product) => ({
      ...product,
      Categories: [
        ...product.Categories,
        ...values.map((cat) => ({ category_name: cat })),
      ],
    }));
    setError(validationsEdit(product));
  };

  const handleChangeDesigners = (values) => {
    setProduct((product) => ({
      ...product,
      Designers: [
        ...product.Designers,
        ...values.map((des) => ({ designer_name: des })),
      ],
    }));
    setError(validationsEdit(product));
  };

  const handleChangeLanguages = (values) => {
    setProduct((product) => ({
      ...product,
      Languages: [
        ...product.Languages,
        ...values.map((lan) => ({ language_name: lan })),
      ],
    }));
    setError(validationsEdit(product));
  };
  const handleChangeThematic = (values) => {
    setProduct((product) => ({
      ...product,
      Thematics: [
        ...product.Thematics,
        ...values.map((t) => ({ thematic_name: t })),
      ],
    }));
    setError(validationsEdit(product));
  };

  const handleChangeMechanic = (values) => {
    setProduct((product) => ({
      ...product,
      Mechanics: [
        ...product.Mechanics,
        ...values.map((m) => ({ mechanic_name: m })),
      ],
    }));
    setError(validationsEdit(product));
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
      let resetImage = product.image.filter((i) => i !== e.target.alt);
      localStorage.setItem("cloud", JSON.stringify(resetImage));
      setProduct({
        ...product,
        image: JSON.parse(localStorage.getItem("cloud")),
      });
      console.log(e.target.alt);
    }
    if (e.target.name === "author_name") {
      product.Author.author_name = "";
      setProduct({ ...product, Author: { author_name: "" } });
    }
    if (e.target.name === "editorial_name") {
      product.Editorial.editorial_name = "";
      setProduct({ ...product, Editorial: { editorial_name: "" } });
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
  console.log(product);
  return (
    <div>
      <div className={style.title}>
        <h1>Edit Product</h1>
        <ModifyOnSale
          product={product}
          setProduct={setProduct}
          handleSwitchOnSale={handleSwitchOnSale}
        />
      </div>
      <div className={style.formContainerEdit}>
        <div className={style.mainContainer}>
          {product && (
            <form className={style} onSubmit={handleSubmit}>
              <div className={style.nameContainer}>
                <label className={style.labels}>Game Name</label>
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className={style.inputEditName}
                />
                {error.name && (
                  <span className={style.errorEdit}>{error.name}</span>
                )}
              </div>

              <div className={style.formCreateDivFlexTwo}>
                <div className={style.subDivTwo}>
                  <label className={style.labels}>Released (YYYY/MM/DD)</label>
                  <input
                    name="released"
                    value={product.released?.substring(0, 10)}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.released && (
                    <span className={style.errorEdit}>{error.released}</span>
                  )}
                </div>
                <div className={style.subDivTwo}>
                  <label className={style.labels}>Price U$D</label>
                  <input
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.price && (
                    <span className={style.errorEdit}>{error.price}</span>
                  )}
                </div>
              </div>
              <div className={style.formCreateDivFlexThree}>
                <div className={style.subDivThree}>
                  <label className={style.labels}>Recommended Age</label>
                  <input
                    name="age"
                    value={product.age}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.age && (
                    <span className={style.errorEdit}>{error.age}</span>
                  )}
                </div>
                <div className={style.subDivThree}>
                  <label className={style.labels}>Quantity min players</label>
                  <input
                    name="players_min"
                    value={product.players_min}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.players_min && (
                    <span className={style.errorEdit}>{error.players_min}</span>
                  )}
                </div>
                <div className={style.subDivThree}>
                  <label className={style.labels}>Quantity max players</label>
                  <input
                    name="players_max"
                    value={product.players_max}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.players_max && (
                    <span className={style.errorEdit}>{error.players_max}</span>
                  )}
                </div>
              </div>
              <div className={style.formCreateDivFlexThree}>
                <div className={style.subDivThree}>
                  <label className={style.labels}>Stock </label>
                  <input
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.stock && (
                    <span className={style.errorEdit}>{error.stock}</span>
                  )}
                </div>
                <div className={style.subDivThree}>
                  <label className={style.labels}>
                    Game's Difficulty (1-5)
                  </label>
                  <input
                    name="weight"
                    value={product.weight}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.weight && (
                    <span className={style.errorEdit}>{error.weight}</span>
                  )}
                </div>
                <div className={style.subDivThree}>
                  <label className={style.labels}>Playing time</label>
                  <input
                    name="playing_time"
                    value={product.playing_time}
                    onChange={handleChange}
                    className={style.inputEdit}
                  />
                  {error.playing_time && (
                    <span className={style.errorEdit}>
                      {error.playing_time}
                    </span>
                  )}
                </div>
              </div>
              <div className={style.imageSt}>
                <label className={style.labels} htmlFor="image">
                  Image
                </label>
                {product.image &&
                  product.image?.map((i) => (
                    <div className={style.imageX}>
                      <img
                        className={style.imageGame}
                        width={"100px"}
                        src={i}
                        alt={i}
                        key={product.image}
                        value={i}
                        name="image"
                        onClick={(e) => handleDelete(e)}
                      />
                      <h3 className={style.overlay}>x</h3>
                    </div>
                  ))}
                <button
                  disabled={product.image?.length >= 4 ? true : false}
                  type="button"
                  className={style.buttonCloudinary}
                  onClick={() => opUploadWidget(product, setProduct)}
                >
                  Upload Image
                </button>
                {error.image && (
                  <span className={style.errorEdit}>{error.image}</span>
                )}
              </div>
              <br />
              <label className={style.labels}>Author</label>
              <Select
                key={"author_id"}
                onChange={(value) => handleChangeAuthor(value)}
                name="author_name"
                style={{
                  width: "50%",
                  margin: "0.5rem",
                  fontSize: "medium",
                  height: "33px",
                }}
                placeholder="Select Author"
              >
                {filteredAuthors &&
                  filteredAuthors.map((fAuth) => {
                    return (
                      <>
                        <Option
                          key={fAuth.author_name}
                          value={fAuth.author_name}
                        >
                          {fAuth.author_name}
                        </Option>
                      </>
                    );
                  })}
              </Select>
              <>
                <button
                  type="button"
                  className={style.subInputEdit}
                  key={"author_name"}
                  value={product.Author?.author_name}
                  name="author_name"
                  onClick={(e) => handleDelete(e)}
                >
                  {product.Author?.author_name}X
                </button>
                {error.Author && (
                  <span className={style.errorEdit}>{error.Author}</span>
                )}
              </>
              <label className={style.labels}>Categories</label>
              <Select
                key={"category_id"}
                mode="multiple"
                onChange={handleChangeCategories}
                name="category_name"
                style={{
                  width: "50%",
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
                        <Option
                          key={cat.category_name}
                          value={cat.category_name}
                        >
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
                      {cat.category_name}x
                    </button>
                  </>
                ))}
              {error.Categories && (
                <span className={style.errorEdit}>{error.Categories}</span>
              )}
              <label className={style.labels}>Designers</label>
              <Select
                mode="multiple"
                onChange={(values) => handleChangeDesigners(values)}
                name="designer_name"
                style={{
                  width: "50%",
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
                      {des.designer_name}x
                    </button>
                  </>
                ))}
              {error.Designers && (
                <span className={style.errorEdit}>{error.Designers}</span>
              )}
              <label className={style.labels}>Editorial</label>
              <Select
                onChange={(value) => handleChangeEditorial(value)}
                name="editorial_name"
                style={{
                  width: "50%",
                  margin: "0.5rem",
                  fontSize: "medium",
                  height: "33px",
                }}
                placeholder="Select Editorial"
              >
                {filteredEditorials &&
                  filteredEditorials.map((fEdit) => {
                    return (
                      <Option
                        key={fEdit.editorial_name}
                        value={fEdit.editorial_name}
                      >
                        {fEdit.editorial_name}
                      </Option>
                    );
                  })}
              </Select>
              <>
                <button
                  type="button"
                  className={style.subInputEdit}
                  key={"editorial_name"}
                  value={product.Editorial?.editorial_name}
                  name="editorial_name"
                  onClick={(e) => handleDelete(e)}
                >
                  {product.Editorial?.editorial_name}X
                </button>
                {error.editorial && (
                  <span className={style.errorEdit}>{error.editorial}</span>
                )}
              </>
              <label className={style.labels}>Languages</label>
              <Select
                mode="multiple"
                onChange={(values) => handleChangeLanguages(values)}
                name="language_name"
                style={{
                  width: "50%",
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
              {error.Languages && (
                <span className={style.errorEdit}>{error.Languages}</span>
              )}
              <label className={style.labels}>Mechanic</label>
              <Select
                mode="multiple"
                onChange={(values) => handleChangeMechanic(values)}
                name="mechanics_name"
                style={{
                  width: "50%",
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
              {error.Mechanics && (
                <span className={style.errorEdit}>{error.Mechanics}</span>
              )}
              <label className={style.labels}>Thematic</label>
              <Select
                mode="multiple"
                onChange={(values) => handleChangeThematic(values)}
                name="thematic_name"
                style={{
                  width: "50%",
                  margin: "0.5rem",
                  fontSize: "medium",
                  height: "33px",
                }}
                placeholder="Select Thematic"
              >
                {filteredTematics &&
                  filteredTematics.map((them) => {
                    return (
                      <Option
                        key={them.thematic_name}
                        value={them.thematic_name}
                      >
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
              {error.Thematics && (
                <span className={style.errorEdit}>{error.Thematics}</span>
              )}
              <button type="submit" className={style.sendButton}>
                Send changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
