import axios from 'axios';
import { sendMessage } from './sendMessage.js';
import { IPO_GROUP_ID } from './constants.js'

const getWhatsappMessage = (stock) => {
    if (!stock) return 'No stock data available';
    const { name, code, price_suggested, pe } = stock;
    return `🎠🎠🎠🎠🎠🎠\n*${name}* - ${code}\n\n` +
        `*Price suggested:* ₹${price_suggested}\n` +
        `*PE:* ${pe}\n` +
        `*report:* https://www.darkhorsestocks.in/`;
}

const getLatestRecommendation = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://backend-reports.darkhorsestocks.in/api/home-page-sections/',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            'DNT': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        }
    };

    console.log('Fetching latest stock recommendation from darkhorse');
    const response = await axios.request(config)
    const stocks = response?.data || []
    const latestStock = stocks[0]?.companyList[0]
    
    console.log('Latest stock recommendation: ', latestStock);
    const message = getWhatsappMessage(latestStock);
    const suggestionDate = new Date(latestStock?.date);
    const currentDate = new Date();
    if(currentDate.getTime() - suggestionDate.getTime() > 24 * 60 * 60 * 1000) {
        console.log('No new recommendation found');
        return null;
    }

    console.log('Triggering whatsapp message darkhorse: ', message);
    await sendMessage(message, IPO_GROUP_ID)

    console.log('Sent update');
}

export default getLatestRecommendation