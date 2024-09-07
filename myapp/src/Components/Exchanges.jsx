import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState("1");

  const changePage = () => {
     setPage(page)
     setLoading(true)
  };

  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [page]);

  if (error) return <ErrorComponent message={"Error While Fetching Data"} />;

  return (
    <div>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {exchanges.map((i) => {
                return (
                  <div>
                    <ExchangeCard
                      key={i.id}
                      image={i.image}
                      name={i.name}
                      trust_score_rank={i.trust_score_rank}
                      url={i.url}
                    />
                  </div>
                );
              })}
            </HStack>
            <HStack  width={"full"} overflowX={"auto"} p={"8"}>
              {btns.map((item, index) => {
                return (
                  <Button
                    key={index}
                    wrap={"wrap"}
                    bgColor={"blackAlpha.900"}
                    color={"white"}
                    onChange={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </HStack>
          </>
        )}
      </Container>
    </div>
  );
};

const ExchangeCard = ({ image, name, trust_score_rank, url }) => {
  return (
    <a href={url} target={"_blank"}>
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
          alt={"Exchanges"}
        />
        <Heading>{trust_score_rank}</Heading>
        <Text>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
