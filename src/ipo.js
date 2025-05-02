import getIpos from 'good-ipo'
import { sendMessage } from './sendMessage.js';
import { IPO_NUMBER } from './constants.js'

const getIpoMessage = ipo => {
    const currentDate = new Date();
    const closingDate = new Date(ipo.close);
    isLastDay = closingDate.getMonth() === currentDate.getMonth() && closingDate.getDate() - currentDate.getDate() < 1
    return `*${ipo.name}*${isLastDay ? '\n🔴LAST DAY🔴' : ''}\nType: ${ipo.type}\nPrice: ${ipo.price}\nProfit: ${ipo.listing.split(' ')[1].slice(1, -1)}\n\n_Subscription details_\nQIB: ${ipo.qib}\nRII: ${ipo.rii}\nTotal: ${ipo.total}\nLast update: ${ipo.last_update}\n${ipo.link}`
}

const sendIpoInMessage = (ipo) => {
    const rating = ipo.gmp === '--' ? 0 : 100 * ((+ipo.gmp) / (+ipo.price))
    return ipo.status !== 'Upcoming' && rating > 10
}

const getGoodIpos = async () => {
    const ipoDetails = await getIpos();
    
    const goodIpos = ipoDetails.filter(ipo => {
        return sendIpoInMessage(ipo)
    })

    const messages = goodIpos.map(getIpoMessage)
    const finalMessage = `**CURRENT EXCITING IPOs!!!**\nCurrent/Upcoming: ${ipoDetails.length}\n\n${messages.join('\n----------------------\n\n')}`

    if (messages.length)
        sendMessage(finalMessage, IPO_NUMBER)

    console.log('Sent update');
}

// Usage:
// getGoodIpos()