import React, { useState } from "react";
import style from "./editproduct.module.css";
import { Modal, Switch } from "antd";
import { FormOutlined } from "@ant-design/icons";
import axios from "axios";
//import { showUploadWidget } from "../../Cloudinary/Cloudinary";
export const EditProduct = ({
  games,
  categories,
  authors,
  designers,
  languages,
  editorials,
  thematics,
  mechanics,
}) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleOk = () => {
    axios.put(
      "https://backprojectboardgames-production.up.railway.app/games",
      product
    );
  };
  const showModal = (g) => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log(games);
  return (
    <div className={style.editProductForm}>
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
          <button key="Save" onClick={handleOk}>
            Save
          </button>,
          <button key="Cancel" onClick={handleCancel}>
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
          <label>Date released</label>
          <input
            name="released"
            value={product.released}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Price</label>
          <input
            name="price"
            value={product.value}
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
            value={product.playes_max}
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
          <label htmlFor="image">Image</label>
          {/* <button
            className={style.buttonCloudinary}
            onClick={() => showUploadWidget(setProduct, product, setError)}
          >
            Upload Image
          </button>
          {error && <h2>Imagen No subida</h2>}
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
            value={product.author_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Categories</label>
          <input
            name="categories_name"
            value={product.categories_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Designer</label>
          <input
            name="designers_name"
            value={product.designers_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Editorial</label>
          <input
            name="editorial_name"
            value={product.editorial_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Languages</label>
          <input
            name="languages_name"
            value={product.languages_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Mechanic</label>
          <input
            name="mechanic_name"
            value={product.mechanic_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <label>Thematic</label>
          <input
            name="thematic_name"
            value={product.thematic_name}
            onChange={handleChange}
            className={style.inputEdit}
          />
          <button type="submit"></button>
        </form>
      </Modal>
    </div>
  );
};
