import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinsCard from "./CoinsCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState("1");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) =>{
  setPage(page) 
  setLoading(true);
  }

  const btns = new Array(132).fill(1);
  console.log(btns)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

  /**/

  return (
    <div>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"inr"}>Inr ₹</Radio>
                  <Radio value={"eur"}>Euro €</Radio>
                  <Radio value={"usd"}>Dollor $</Radio>
                </HStack>
              </RadioGroup>
            </div>
            <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
              {coins.map((i) => {
                return (
                  <>
                    <div>
                      <CoinsCard
                        key={i.id}
                        id={i.id}
                        image={i.image}
                        name={i.name}
                        current_price={i.current_price}
                        rank={i.market_cap_rank}
                        currencySymbol={currencySymbol}
                      />
                    </div>
                  </>
                );
              })}
            </HStack>
          </>
        )}
        <HStack width={"full"} overflowX={"auto"} p={"8"}>
          {btns.map((iteam, index) => {
            return (
              <Button
                key={index}
                wrap={"wrap"}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            );
          })}
        </HStack>
      </Container>
    </div>
  );
};

export default Coins;
