import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MercadoPagoFailure() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/cart");

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
        Something were wrong. Do not worry, try again!
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        variant="solid"
        onClick={handleClick}
      >
        Finish your purchase
      </Button>
    </div>
  );
}
