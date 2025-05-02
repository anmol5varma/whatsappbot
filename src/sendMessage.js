import axios from 'axios';
import 'dotenv/config'

export const sendMessage = async (message, number) => {
    let data = JSON.stringify({
        "chatId": `${number}@c.us`,
        "message": message,
        "linkPreview": false
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.INSTANCE_ID.slice(0,4)}.api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.API_TOKEN}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        await axios.request(config)
    } catch (err) {
        console.log(err);
    }
}


"https://7105.api.greenapi.com/waInstance7105236685/sendMessage/f947c469f7f14c029ea28d4ebb8cff846f594ffbcf134df0a4"
