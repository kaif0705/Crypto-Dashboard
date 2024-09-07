import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {server} from "../index"
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {
  const params= useParams()
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays]= useState('24h')
  const [chartArray, setChartArray]= useState([])

  const currencySymbol= currency==="inr"? "₹": currency=== "eur"? "€": "$";
  
  const btns= ['24h','7d','14d','30d','60d','200d','365d','max']
  const switchChartStats= (key)=>{
   switch(key){
    case('7d'):
    setDays('7d')
    setLoading(true)
    break;

    case('14d'):
    setDays('14d')
    setLoading(true)
    break;

    case('30d'):
    setDays('30d')
    setLoading(true)
    break;

    case('60d'):
    setDays('60d')
    setLoading(true)
    break;

    case('200d'):
    setDays('200d')
    setLoading(true)
    break;

    case('365d'):
    setDays('365d')
    setLoading(true)
    break;

    case('max'):
    setDays('max')
    setLoading(true)
    break;

    default:
      setDays("24h")
      setLoading(true)
      break;
   }
  }
  
  useEffect(()=>{
    const fetchCoin= async()=>{
      try{
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        const {data: chartData}= await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        setLoading(false)
        setCoin(data)
        setChartArray(chartData.prices)
      }catch(error){
        console.log(error)
        setError(true)
        setLoading(false)
      }
  }
    fetchCoin()
    
  }, [params.id, currency, days])

  if(error) return ( <ErrorComponent message={'Error While Fetching Coins Details'}/> )

  return (
    <Container maxW={'xxl'}>
      {
        loading? <Loader />:(
          <>
            <Box width={'full'} borderWidth={'1'}>
              <Chart currency={currencySymbol} arr={chartArray} days={days}/>
            </Box>
            <HStack p={'4'} overflowX={'auto'}>
              {
                btns.map((i)=>(
                <Button key={i} onClick={()=> switchChartStats(i)}>{i}</Button>  
                ))
              }
            </HStack>
            <RadioGroup value={currency} onChange={setCurrency} p={'4'}>
              <HStack>
                <Radio value='inr'>Inr</Radio>
                <Radio value='eur'>Eur</Radio>
                <Radio value='usd'>Usd</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} alignItems={'flex-start'}>
                <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>Last updated on {Date(coin.market_data.last_updated).split("G")[0]}</Text>
                <Image 
                  src={coin.image.large}
                  height={'16'}
                  width={'16'}
                  objectFit={'contain'}
                />
                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                  <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h>0? "increase": "decrease"}/>
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
                </Stat>
                <Badge 
                fontSize={'xl'}
                bgColor={'blackAlpha.800'}
                color={'white'}
                >#{coin.market_data.market_cap_rank}</Badge>
                
                <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
                <Box w={'full'} p={'4'}>
                  <Item title={"Max Supply"} value={`${coin.market_data.total_supply}`}/>
                  <Item title={"Circulating Supply"} value={`${coin.market_data.circulating_supply}`}/>
                  <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                  <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
                  <Item title={"All Time High Date"} value={`${coin.market_data.ath_date[currency].split("T")[0]}`}/>
                  <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                  <Item title={"All Time Low Date"} value={`${coin.market_data.atl_date[currency].split("T")[0]}`}/>
                </Box>
            </VStack>
          </>
        )
      }
    </Container>
  )
}

const Item= ({title, value})=>(
  <HStack justifyContent={"space-between"} my={'4'} w={'full'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text fontFamily={'Bebas Neue'}>{value}</Text>
  </HStack>
)

const CustomBar= ({high, low})=>{
  return(
    <VStack>
      <Progress w={'full'} colorScheme={'teal'} value={50}/>
      <HStack w={'full'} justifyContent={'space-evenly'}>
        <Badge children={high} colorScheme={'green'}/>
        <Text fontSize={'small'}>24Hr Range</Text>
        <Badge children={low} colorScheme={'red'}/>
      </HStack>
    </VStack>
  )
}

export default CoinDetails