import axios from 'axios';
import 'dotenv/config'

export const createTextTable = (data) => {
    // Calculate the maximum width of each column
    const colWidths = data[0].map((_, colIndex) =>
        Math.max(...data.map(row => (row[colIndex] || '').toString().length))
    );

    // Helper to pad each cell to its column width
    const padCell = (text, width) => text.toString().padEnd(width, ' ');

    // Build table string
    const rows = data.map((row, rowIndex) => {
        return row.map((cell, i) => padCell(cell, colWidths[i])).join(' | ');
    });

    // Insert separator line after header (first row)
    const separator = colWidths.map(w => '-'.repeat(w)).join('-|-');
    rows.splice(1, 0, separator);

    // Wrap the whole thing in triple backticks for WhatsApp formatting
    return '```' + rows.join('\n') + '```';
}


export const sendMessage = async (message, id) => {
    let data = JSON.stringify({
        "chatId": id,
        "message": message,
        "linkPreview": false
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.INSTANCE_ID.slice(0, 4)}.api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.API_TOKEN}`,
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
