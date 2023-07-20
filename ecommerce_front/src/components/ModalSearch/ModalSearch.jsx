import React, { useState } from "react";
import { getAllGames, getGamesByName } from "../../Redux/actions_creators";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

const ModalSearch = ({ search, handleModalSearch, modal, handleKey }) => {
  console.log(search);

  const dispatch = useDispatch();

  return (
    <Modal
      open={handleKey.modal}
      title="Matching games"
      onCancel={handleModalSearch.handleModalSearch}
      footer={""}
    >
      <h3>Matching games</h3>
      <div>
        {/* {search &&
          search.map((game) => {
            return (
              <Card
                name={game.name}
                image={game.image}
                price={game.price}
                key={game.game_id}
                id={game.game_id}
                onSale={game.on_sale}
              />
            );
          })} */}
      </div>
    </Modal>
  );
};

export default ModalSearch;
