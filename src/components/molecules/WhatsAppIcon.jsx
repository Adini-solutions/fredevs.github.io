import { Box } from "@chakra-ui/react";
import { useWhatsAppUrl } from "../../utils/whatsapp";

const WhatsAppIcon = ({ position }) => {
  const href = useWhatsAppUrl();

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
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
          alt=""
          style={{ width: "70%", height: "70%" }}
        />
      </Box>
    </a>
  );
};

export default WhatsAppIcon;
