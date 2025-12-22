import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const WhatsAppIcon = ({ position }) => {
  

  return (
    <Link to={`https://wa.me/5491144123760`} target="_blank">
      <Box
        position={position}
        bottom="20px"
        right="20px"
        width="45px"
        height="45px"
        bg="#36a851"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={"3px"}
        _hover={{ bg: "#24a755" }}
      >
        <img
          src="/assets/icons/whatsappIcon.png"
          alt="WhatsApp"
          style={{ width: "70%", height: "70%" }}
        />
      </Box>
    </Link>
  );
};

export default WhatsAppIcon;
