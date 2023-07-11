import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";

export default function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/games");

  return (
    <div>
      <Box maxW="md" mx="auto" mt={8} p={4} textAlign="center">
        <Text fontSize="3xl" color="blue.700">
          404 - Page Not Found Oops! The page you are looking for does not
          exist.
        </Text>
        <Button mt={4} colorScheme="blue" size="lg" onClick={handleClick}>
          Go back
        </Button>
      </Box>
    </div>
  );
}
