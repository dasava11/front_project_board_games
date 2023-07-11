import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MercadoPagoPending() {
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
        Almost there...
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
/*
 *

export default function MercadoPagoSuccess() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <div>
    </div>
  );
}
 */
