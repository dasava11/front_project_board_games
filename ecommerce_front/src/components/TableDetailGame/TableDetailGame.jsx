import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Characteristic",
    dataIndex: "Characteristic",
    key: "Characteristic",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
  },
];

let data = [
  {
    key: "1",
    Characteristic: "Author",
    Description: "",
  },
  {
    key: "2",
    Characteristic: "Designers",
    Description: "",
  },
  {
    key: "3",
    Characteristic: "Editorial",
    Description: "",
  },
  {
    key: "4",
    Characteristic: "Editorial",
    Description: "",
  },
  {
    key: "5",
    Characteristic: "Languages",
    Description: "",
  },
  {
    key: "6",
    Characteristic: "Mechanics",
    Description: "",
  },
  {
    key: "7",
    Characteristic: "Thematics",
    Description: "",
  },
  {
    key: "8",
    Characteristic: "Age",
    Description: "",
  },
  {
    key: "9",
    Characteristic: "Difficulty",
    Description: "",
  },
];

const TableDetailGame = ({ game }) => (
  <Table columns={columns} dataSource={data} />
);
export default TableDetailGame;
