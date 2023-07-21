import React from "react";
import style from "./Accordion.module.css";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const AccordionFaq = (props) => {
  const { question, answer } = props;
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <Accordion allowToggle>
      <AccordionItem
        className={
          darkMode === true ? style.darkAccordioItem : style.accordionItem
        }
      >
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} className={style.accordionPanel}>
          {answer}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionFaq;
