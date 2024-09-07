import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinsCard = ({ current_price, rank, id, image, name, symbol, currencySymbol='₹'}) => {
  return (
    <div>
      <Link to={`/coins/${id}`} target={'blank'}>
        <VStack
          w={"52"}
          borderRadius={"lg"}
          p={"8"}
          shadow={"lg"}
          transition={"all 0.3s"}
          m={"4"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image
            src={image}
            h={"10"}
            w={"10"}
            objectFit={"contain"}
            alt={"Coins"}
          />
          <Heading>{name}</Heading>
          <Heading>{rank}</Heading>
          <Text>{currencySymbol}{current_price}</Text>
          <Text>{symbol}</Text>
        </VStack>
      </Link>
    </div>
  );
};

export default CoinsCard;
