import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import FirsPage from "../FirstPage/FirsPage";
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
  const navigate = useNavigate();
  const [input, setInput] = useState({ image: [] });
  const [modalCategories, setModalCategories] = useState(false);
  const [modalThematic, setModalThematic] = useState(false);
  const [modalAuthor, setModalAuthor] = useState(false);
  const [modalDesigner, setModalDesigner] = useState(false);
  const [modalMechanic, setModalMechanic] = useState(false);
  const [modalEditorial, setModalEditorial] = useState(false);
  const [modalLanguage, setModalLanguage] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    released: "",
    price: "",
    weight: "",
    age: "",
    players_min: "",
    players_max: "",
    playing_time: "",
    stock: "",
  });
  const [next, setNext] = useState(false);

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
  const handleChangeCategories = (values) => {
    setInput({ ...input, categories_name: values });
  };
  const handleChangeDesigners = (values) => {
    setInput({ ...input, designers_name: values });
  };
  const handleChangeEditorial = (value) => {
    setInput({ ...input, editorial_name: value });
  };
  const handleChangeMechanics = (values) => {
    setInput({ ...input, mechanics_name: values });
  };
  const handleChangeThematics = (values) => {
    setInput({ ...input, thematics_name: values });
  };
  const handleChangeLanguages = (values) => {
    setInput({ ...input, languages_name: values });
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
      rating: [],
      image: [],
      weight: 0,
      playing_time: 0,
      author_name: "",
      categories_name: [],
      designers_name: [],
      editorial_name: "",
      languages_name: [],
      mechanics_name: [],
      thematics_name: [],
    });
    e.target.reset();
    navigate("/admin");
  };

  const handleNext = () => {
    if (next === true) {
      setNext(false);
    } else {
      setNext(true);
    }
  };

  return (
    <>
      <div className="maincontainer"></div>
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <h2 className="title-form">Create Product</h2>
          {next === false ? (
            <FirsPage
              input={input}
              errors={errors}
              handleChange={handleChange}
              setInput={setInput}
              setErrors={setErrors}
            />
          ) : (
            <>
              <div className="selectFlexCreate">
                <Select
                  onChange={(value) => handleChangeAuthors(value)}
                  name="author_name"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                    border: "1px solid white",
                    borderRadius: "8px",
                  }}
                  placeholder="Select Author"
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
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  mode="multiple"
                  onChange={(values) => handleChangeDesigners(values)}
                  name="designers_name"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                  }}
                  placeholder="Select Designers"
                >
                  {allDesigners &&
                    allDesigners.map((des) => {
                      return (
                        <Option
                          key={des.designer_name}
                          value={des.designer_name}
                        >
                          {des.designer_name}
                        </Option>
                      );
                    })}
                </Select>
                <p
                  className="create-button"
                  onClick={handleModalCreateDesigner}
                >
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  mode="multiple"
                  onChange={(values) => handleChangeCategories(values)}
                  name="categories_name"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                  }}
                  placeholder="Select Categories"
                >
                  {allCategories &&
                    allCategories.map((cat) => {
                      return (
                        <Option
                          key={cat.category_name}
                          value={cat.category_name}
                        >
                          {cat.category_name}
                        </Option>
                      );
                    })}
                </Select>

                <p
                  className="create-button"
                  onClick={handleModalCreateCategories}
                >
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  name="editorial_name"
                  onChange={(value) => handleChangeEditorial(value)}
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                  }}
                  placeholder="Select Editorial"
                >
                  {allEditorials &&
                    allEditorials.map((edit) => {
                      return (
                        <Option
                          key={edit.editorial_name}
                          value={edit.editorial_name}
                        >
                          {edit.editorial_name}
                        </Option>
                      );
                    })}
                </Select>
                <p
                  className="create-button"
                  onClick={handleModalCreateEditorial}
                >
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  mode="multiple"
                  onChange={(values) => handleChangeMechanics(values)}
                  name="mechanics_name"
                  placeholder="Select Mechanics"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                  }}
                >
                  {allMechanics &&
                    allMechanics.map((mec) => {
                      return (
                        <Option
                          key={mec.mechanic_name}
                          value={mec.mechanic_name}
                        >
                          {mec.mechanic_name}
                        </Option>
                      );
                    })}
                </Select>

                <p
                  className="create-button"
                  onClick={handleModalCreateMechanic}
                >
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  mode="multiple"
                  onChange={(values) => handleChangeThematics(values)}
                  name="thematics_name"
                  placeholder="Select Thematics"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    height: "33px",
                  }}
                >
                  {allThematics &&
                    allThematics.map((them) => {
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
                <p
                  className="create-button"
                  onClick={handleModalCreateThematic}
                >
                  Create
                </p>
              </div>
              <div className="selectFlexCreate">
                <Select
                  onChange={(values) => handleChangeLanguages(values)}
                  name="languages_name"
                  mode="multiple"
                  placeholder="Select Languages"
                  style={{
                    width: "100%",
                    margin: "0.5rem",
                    fontSize: "medium",
                    borderRadius: "8px",
                    height: "33px",
                  }}
                >
                  {allLanguages &&
                    allLanguages.map((len) => {
                      return (
                        <Option
                          key={len.language_name}
                          value={len.language_name}
                        >
                          {len.language_name}
                        </Option>
                      );
                    })}
                </Select>
                <p
                  className="create-button"
                  onClick={handleModalCreateLanguage}
                >
                  Create
                </p>
              </div>
            </>
          )}
          {next === false ? (
            <a onClick={handleNext} className="next-button">
              Next
            </a>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <a onClick={handleNext} className="prev-button">
                Prev
              </a>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          )}
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
