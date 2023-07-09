import React, { useState, useEffect } from "react";
import style from "./editproduct.module.css";
import { Modal, Switch } from "antd";
import { FormOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../Redux/actions_creators";
//import { showUploadWidget } from "../Cloudinary/Cloudinary";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
export const EditProduct = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
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
    } else if (name === "mechanic_name") {
      setProduct({
        ...product,
        Mechanic: { ...product.Mechanic, mechanic_name: value },
      });
    } else if (name === "thematic_name") {
      setProduct({
        ...product,
        Thematic: { ...product.Thematic, thematic_name: value },
      });
    } else if (name === "language_name") {
      const updatedLanguage = product.Languages?.map((lan) =>
        lan.language_name === value ? { ...lan, language_name: value } : lan
      );
      setProduct({
        ...product,
        Languages: updatedLanguage,
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleOk = () => {
    axios.put(
      "https://backprojectboardgames-production.up.railway.app/games",
      product
    );
  };
  const showModal = (g) => {
    setProduct(g);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log(product);
  return (
    <div className={style.editProductForm}>
      <HeaderAdmin />

      <h1 className={style.titleEdit}>Edit Product</h1>

      <h1>Edit Product</h1>

      <table className={style.mainTable}>
        <thead className={style.titleTable}>
          <tr className={style.tr}>
            <th className={style.th}>GameName</th>
            <th className={style.th}>Price</th>
            <th className={style.th}>Age</th>
            <th className={style.th}>Min Players</th>
            <th className={style.th}>Max Players</th>
            <th className={style.th}>Stock</th>
            <th className={style.th}>Playing Time</th>
            <th className={style.th}>Edit</th>
            <th className={style.th}>Enable/disable</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((g) => {
              return (
                <tr className={style.tr} key={g.name}>
                  <td className={style.th}>{g.name}</td>
                  <td className={style.th}>U$D{g.price}</td>
                  <td className={style.th}>{g.age}</td>
                  <td className={style.th}>{g.players_min}</td>
                  <td className={style.th}>{g.players_max}</td>
                  <td className={style.th}>{g.stock}</td>
                  <td className={style.th}>{g.playing_time}</td>
                  <td className={style.th}>
                    <FormOutlined onClick={() => showModal(g)} />
                  </td>
                  <td className={style.th}>
                    <Switch defaultChecked={g.active} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal
        open={open}
        title="Edit Game"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button key="Save" onClick={handleOk} className={style.buttonSave}>
            Save
          </button>,
          <button
            key="Cancel"
            onClick={handleCancel}
            className={style.buttonSave}
          >
            Cancel
          </button>,
        ]}
      >
        <form>
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

          <button
            className={style.buttonCloudinary}
            onClick={() => showUploadWidget(setProduct, product, setError)}
          >
            Upload Image
          </button>
          {/* {error && <h2>Imagen No subida</h2>}
          {product.image > 0 && <h2>Imagen cargada correctamente</h2>} */}
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
            value={product.Author?.author_name || ""}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Categories</label>
          {product.Categories &&
            product.Categories?.map((cat) => (
              <input
                className={style.inputEdit}
                key={cat.category_name}
                value={cat.category_name}
                name="category_name"
                onChange={handleChange}
              />
            ))}
          <label>Designers</label>
          {product.Designers &&
            product.Designers?.map((des) => {
              return (
                <input
                  className={style.inputEdit}
                  key={des.designer_name}
                  value={des.designer_name}
                  name="designer_name"
                  onChange={handleChange}
                />
              );
            })}
          <label>Editorial</label>
          <input
            name="editorial_name"
            value={product.Editorial?.editorial_name || ""}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Languages</label>
          {product.Languages &&
            product.Languages?.map((lan) => {
              return (
                <button
                  className={style.inputEdit}
                  key={lan.language_name}
                  value={lan.language_name}
                  name="language_name"
                  onChange={handleChange}
                />
              );
            })}
          <label>Mechanic</label>
          <input
            name="mechanic_name"
            value={product.Mechanic?.mechanic_name || ""}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Thematic</label>
          <input
            name="thematic_name"
            value={product.Thematic?.thematic_name || ""}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <button type="submit"></button>
        </form>
      </Modal>
    </div>
  );
};
