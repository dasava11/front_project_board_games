import React, { useState } from "react";
import { getAllGames, getGamesByName } from "../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

/* const regexNumber = /^[0-9]+$/;
const validation = (search) => {
  const errors = {};
  if (regexNumber.test(search)) {
    errors.search = "The field doesn't admit numbers";
  }
  return errors;
}; */

const ModalSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    setError(validation(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(error).length) {
      alert("The field doesn't admit numbers");
    } else {
      if (!search) {
        dispatch(getAllGames());
        setSearch("");
      } else {
        dispatch(getGamesByName(search));
        /* setPages(1); */
        setSearch("");
      }
    }

    return (
      <Modal
        open={setIsOpen.isOpen}
        title="Create Information"
        onOk={handleOk}
        onCancel={setIsOpen.setIsOpen}
        footer={""}
      >
        <h3>Create Language</h3>
        <form onSubmit={(e) => handleSubmitLanguage(e)}>
          <input
            className="inputs"
            type="text"
            placeholder="Language"
            onChange={handleChange}
            name="language_name"
          />
          <button className="submit-button-modal" type="submit">
            Create
          </button>
        </form>
      </Modal>
    );
  };
};
export default ModalSearch;
