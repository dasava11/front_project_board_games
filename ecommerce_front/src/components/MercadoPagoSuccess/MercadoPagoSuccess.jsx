import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MercadoPagoSuccess() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/games");

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="2em"
        marginLeft="50em"
      />
      <Text fontSize="5x1" color="blue.900">
        Thanks for buying! You will receive a confirmation email soon.
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        variant="solid"
        onClick={handleClick}
      >
        See more games
      </Button>
    </div>
  );
}
