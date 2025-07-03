import getIpos from './src/ipo.js';
import getLatestRecommendation from './src/darkhorse.js';

const main = async () => {
    try {
        await getIpos();
        console.log('IPO alert sent successfully');
    } catch (error) {
        console.error('Error fetching IPOs:', error);
    }

    try {
        await getLatestRecommendation();
        console.log('Darkhorse recommendation sent successfully');
    } catch (error) {
        console.error('Error fetching Darkhorse recommendation:', error);
    }
}

main()
    .then(() => console.log('All tasks completed successfully'))
    .catch(err => console.error('An error occurred:', err));