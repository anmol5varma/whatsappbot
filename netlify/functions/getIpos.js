// netlify/functions/getIpos.js
import getIpos from '../../src/ipo.js';

export async function handler(event, context) {
  try {
    await getIpos();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'IPO message sent!' }),
    };
  } catch (error) {
    console.error('Error in function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
