import {
	Position
} from '@/types/Position';
import axios from 'axios';

export const fetchPosition = async(address: string) => {
	try {
		const positions: Position[] = [];
		const getPositionsUrl = `https://sepolia-api.ekubo.org/positions/${address}`;
		const userPositions = await axios.get(getPositionsUrl);
		for (const position of userPositions.data.data) {
			const positionMetadata = await fetchMetadataByPositionId(position.id);
			const positionHistory = await fetchHistoryByPositionId(position.id);
			const positionExtractValues = extractValues(positionMetadata.name);
			let positionHistoryLiquidity = 0;
			for (const positionHistoryRecord of positionHistory.events) {
				if (positionHistoryRecord.type === 'update') {
					const token1Formatted = formatToken(positionHistoryRecord.delta0, positionExtractValues.token1);
					const token2Formatted = formatToken(positionHistoryRecord.delta1, positionExtractValues.token2);
					const token1PriceInUSD = await fetchCryptoPrice(positionExtractValues.token1);
					const token2PriceInUSD = await fetchCryptoPrice(positionExtractValues.token2);
					const token1InUSD = calculateUSDByToken(token1Formatted, token1PriceInUSD.RAW?.[positionExtractValues.token1]?.USD.PRICE);
					const token2InUSD = calculateUSDByToken(token2Formatted, token2PriceInUSD.RAW?.[positionExtractValues.token2]?.USD.PRICE);
					const positionHistoryRecordLiquidity = (token1InUSD + token2InUSD);
					positionHistoryLiquidity = positionHistoryLiquidity + positionHistoryRecordLiquidity;
				}
			}
			const mainTokenPriceInUSD = await fetchCryptoPrice(positionExtractValues.token1);
			const newPosition = {
				positionId: position.id,
				pool: {
					t1: positionExtractValues.token1,
					t2: positionExtractValues.token2,
				},
				roi: 0.9, // TODO
				feeAPY: 11.8, // TODO
				liquidity: positionHistoryLiquidity,
				priceRange: {
					min: positionExtractValues.price1,
					max: positionExtractValues.price2,
				},
				currentPrice: mainTokenPriceInUSD.DISPLAY?.[positionExtractValues.token1]?.USD.PRICE
			};
			positions.push(newPosition);
		}
		return positions;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Axios Error:', error.message);
		} else {
			console.error('Unexpected Error:', error);
		}
	}
};

const formatToken = (token: number, tokenSymbol: string) => {
	if (tokenSymbol === "USDC") {
		return (token / 10 ** 6);
	} else {
		return (token / 10 ** 18);
	}
}

const extractValues = (input: string) => {
	const [pair, prices, percentages] = input.split(' : ');
	const [token2, token1] = pair.split(' / ');
	const [price1, price2] = prices.split(' <> ');
	const [percentage1, percentage2] = percentages.split(' / ');
	return {
		token1,
		token2,
		price1: parseFloat(price1),
		price2: parseFloat(price2),
		percentage1: parseFloat(percentage1.replace('%', '')),
		percentage2: parseFloat(percentage2.replace('%', '')),
	};
};

const fetchMetadataByPositionId = async(positionId: string) => {
	const positionMetadataUrl = `https://sepolia-api.ekubo.org/${positionId}`;
	try {
		const response = await axios.get(positionMetadataUrl);
		return response.data;
	} catch (error) {
		console.error('Error fetchMetadataByPosition data:', error);
	}
};

const fetchCryptoPrice = async(token: string) => {
	const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${token}&tsyms=USD`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error('Error fetchCryptoPrice data:', error);
	}
};

const fetchHistoryByPositionId = async(positionId: number) => {
	const url = `https://sepolia-api.ekubo.org/${positionId}/history`;
	try {
		const response = await axios.get(url, {
			headers: {
				'Accept': 'application/json',
			},
		});
		//console.log(response.data); 
		return response.data;
	} catch (error) {
		console.error('Error fetchHistoryByPositionId the API:', error);
		throw error;
	}
};

const calculateUSDByToken = (tokenPrice: number, tokenPriceUSD: number) => {
	return (tokenPrice * tokenPriceUSD);
};