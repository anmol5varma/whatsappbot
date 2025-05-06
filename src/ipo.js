import getIpos from 'good-ipo'
import { sendMessage } from './sendMessage.js';
import { IPO_NUMBER } from './constants.js'

const getIpoMessage = ipo => {
    const currentDate = new Date();
    const closingDate = new Date(ipo.close);
    const isLastDay = closingDate.getMonth() === currentDate.getMonth() && closingDate.getDate() - currentDate.getDate() < 1
    return `*${ipo.name}*${isLastDay ? '\n🔴LAST DAY🔴' : ''}\nType: ${ipo.type}\nPrice: ${ipo.price}\nProfit: ${ipo.listing.split(' ')[1].slice(1, -1)}\n\n_Subscription details_\nQIB: ${ipo.qib}\nRII: ${ipo.rii}\nTotal: ${ipo.total}\nLast update: ${ipo.last_update}\n${ipo.link}`
}

const sendIpoInMessageFilter = (ipo) => {
    const rating = ipo.gmp === '--' ? 0 : 100 * ((+ipo.gmp) / (+ipo.price))
    return ipo.status !== 'Upcoming' && rating > 25
}

const getGoodIpos = async () => {
    const ipoDetails = await getIpos();
    console.log('Original length: ', ipoDetails?.length);
    
    const goodIpos = ipoDetails.filter(sendIpoInMessageFilter)
    console.log('Filtered length: ', goodIpos?.length);
    

    const messages = goodIpos.map(getIpoMessage)
    const finalMessage = `**CURRENT EXCITING IPOs!!!**\nCurrent/Upcoming: ${ipoDetails.length}\n\n${messages.join('\n----------------------\n\n')}`

    console.log('Triggering whatsapp message: ', messages?.length);
    if (messages.length)
        await sendMessage(finalMessage, IPO_NUMBER)

    console.log('Sent update');
}

export default getGoodIpos
// Usage:
getGoodIpos()