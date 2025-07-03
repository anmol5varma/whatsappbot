import getIpos from 'good-ipo'
import { sendMessage, createTextTable } from './sendMessage.js';
import { IPO_GROUP_ID } from './constants.js'

const getIpoMessage = ipo => {
    const currentDate = new Date();
    const closingDate = new Date(ipo.close);
    const isLastDay = closingDate.getMonth() === currentDate.getMonth() && closingDate.getDate() === currentDate.getDate()
    let finalMessage = `*${ipo.name}* - ${ipo.type}${isLastDay ? '\n🔴LAST DAY🔴' : ''}\n`
    const priceTable = createTextTable([
        ['Price', 'GMP', 'Profit%'],
        [`₹${ipo.price}`, `₹${ipo.gmp}`, ipo.listing.split(' ')[1].slice(1, -1)]
    ])
    const subscriptionTable = createTextTable([
        ['QIB', 'RII', 'Total'],
        [ipo.qib, ipo.rii, ipo.total]
    ])
    finalMessage += `${priceTable}\n\n${subscriptionTable}\n\nCloses: ${ipo.close}\nLast update: ${ipo.last_update}\n${ipo.link}\n`
    return finalMessage    
}

const sendIpoInMessageFilter = (ipo) => {
    const rating = ipo.gmp === '--' ? 0 : 100 * ((+ipo.gmp) / (+ipo.price))
    return ipo.status !== 'Upcoming' && rating > 2
}

const getGoodIpos = async () => {
    const ipoDetails = await getIpos();
    console.log('Original length: ', ipoDetails?.length);

    const goodIpos = ipoDetails.filter(sendIpoInMessageFilter)
    console.log('Filtered length: ', goodIpos?.length);


    const messages = goodIpos.map(getIpoMessage)
    const finalMessage = `💹💹💹💹💹💹\n*OPEN IPOs!!!*\nCurrent/Upcoming: ${ipoDetails.length}\n\n${messages.join('__________________________________\n\n')}`

    console.log('Triggering whatsapp message: ', messages?.length);
    if (messages.length)
        await sendMessage(finalMessage, IPO_GROUP_ID)

    console.log('Sent update');
}

export default getGoodIpos