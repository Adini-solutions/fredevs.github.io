import { Children, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

/**
 * Carrusel sólo para celular. Debajo de 768px muestra a sus hijos en una fila
 * que se desliza con el dedo, con la tarjeta siguiente asomando y puntos que
 * indican la posición. Desde 768px se vuelve transparente (`display:
 * contents`): los hijos se acomodan según el contenedor que lo envuelve
 * (Flex, SimpleGrid), igual que si el carrusel no estuviera.
 *
 * `pt` deja lugar arriba para lo que sobresalga de las tarjetas (por ejemplo
 * las ilustraciones de los servicios), porque una fila con scroll horizontal
 * recorta lo que se sale por arriba.
 */
export default function Carrusel({ children, itemWidth = "84%", px = 5, pt = 2, mt = 0, color = "#6c63ff", inactive = "gray.300" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    [...el.children].forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - el.offsetLeft + child.offsetWidth / 2 - center);
      if (distance < min) {
        min = distance;
        closest = i;
      }
    });
    setActive(closest);
  };

  const goTo = (i) => {
    const el = ref.current;
    const child = el?.children[i];
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <>
      <Box
        ref={ref}
        onScroll={onScroll}
        display={{ base: "flex", md: "contents" }}
        w="100%"
        minW={0}
        gap={4}
        px={px}
        pt={pt}
        pb={4}
        mt={mt}
        overflowX="auto"
        sx={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((child, i) => (
          <Box
            key={child.key ?? i}
            display={{ base: "flex", md: "contents" }}
            flex={`0 0 ${itemWidth}`}
            justifyContent="center"
            sx={{ scrollSnapAlign: "center" }}
          >
            {child}
          </Box>
        ))}
      </Box>

      {items.length > 1 && (
        <Flex display={{ base: "flex", md: "none" }} w="100%" justify="center" gap={2} mt={2}>
          {items.map((child, i) => (
            <Box
              key={child.key ?? i}
              as="button"
              type="button"
              aria-label={`${i + 1} / ${items.length}`}
              onClick={() => goTo(i)}
              h="8px"
              w={i === active ? "22px" : "8px"}
              borderRadius="full"
              bg={i === active ? color : inactive}
              transition="width 0.25s ease, background-color 0.25s ease"
            />
          ))}
        </Flex>
      )}
    </>
  );
}
