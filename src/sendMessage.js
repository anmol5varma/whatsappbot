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
        const res = await axios.request(config)
        console.log('idMessage: ', res.data?.idMessage);
    } catch (err) {
        console.log(err);
    }
}
