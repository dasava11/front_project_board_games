import React, { useState } from "react";
import style from "./FirstPage.module.css";
import { showUploadWidget } from "../Cloudinary/Cloudinary";
const FirsPage = (props) => {
  const { input, errors, handleChange, setError, setInput } = props;

  return (
    <div className={style.firstPageStyle}>
      <div className={style.formCreateDivFlex}>
        <div className="formCreateDivFlexSub">
          <input
            className="inputs-create"
            type="text"
            placeholder="Game name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className="formCreateDivFlexSub">
          <input
            className="inputs-create"
            type="date"
            placeholder="Released"
            name="released"
            value={input.released}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="formCreateDivFlex">
        <div className="formCreateDivFlexSub">
          <input
            className="inputs-create"
            type="number"
            placeholder="Price"
            name="price"
            value={input.price}
            onChange={handleChange}
            step=".01"
            min={0}
            max={9999}
          />
          {errors.price && <span>{errors.price}</span>}
        </div>
        <div className="formCreateDivFlexSub">
          <input
            className="inputs-create"
            type="text"
            placeholder="Minimum age"
            name="age"
            value={input.age}
            onChange={handleChange}
            min={0}
          />
          {errors.age && <span>{errors.age}</span>}
        </div>
      </div>
      <div className="formCreateDivFlex">
        <div className="formCreateDivFlexSub">
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
        </div>
        <div className="formCreateDivFlexSub">
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
        </div>
      </div>
      <input
        className={style.inputsCreate}
        type="number"
        placeholder="Available stock"
        name="stock"
        value={input.stock}
        onChange={handleChange}
        min={0}
      />
      {errors.stock && <span>{errors.stock}</span>}

      <label>Image</label>
      <p
        className={style.buttonCloudinary}
        onClick={() => showUploadWidget(setInput, input, setError)}
      >
        Upload Images
      </p>
      {input.image.length === 0 ? (
        <h4 className={style.uploadImError}>Not uploaded</h4>
      ) : (
        <h4 className={style.uploadIm}>Image Uploaded</h4>
      )}

      <div className="formCreateDivFlex">
        <div className="formCreateDivFlexSub">
          <input
            className={style.inputsCreate}
            type="number"
            placeholder="Difficulty(1-5)"
            name="weight"
            value={input.weight}
            onChange={handleChange}
            step=".01"
            min={1}
            max={5}
          />
          {errors.weight && <span>{errors.weight}</span>}
        </div>
        <div className="formCreateDivFlexSub">
          <input
            className={style.inputsCreate}
            type="number"
            placeholder="Playing time (minutes)"
            name="playing_time"
            value={input.playing_time}
            onChange={handleChange}
            min={0}
          />
          {errors.playing_time && <span>{errors.playing_time}</span>}
        </div>
      </div>
    </div>
  );
};

export default FirsPage;
