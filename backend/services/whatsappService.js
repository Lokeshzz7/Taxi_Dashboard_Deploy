// const twilio = require('twilio');
// require('dotenv').config();

// // Twilio credentials
// // const accountSid = process.env.AUTH_SID;
// // const authToken =  process.env.AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// const sendInvoiceViaWhatsApp = async (customerPhone, filePath) => {
//     try {
//         const publicUrl = `https://ae6c-115-245-169-114.ngrok-free.app/${filePath}`;
//         console.log('Sending WhatsApp message with mediaUrl:', publicUrl);

//         const message = await client.messages.create({
//             from: 'whatsapp:+14155238886',  // Twilio WhatsApp Sandbox Number
//             to: `whatsapp:+91${customerPhone}`,  // Customer's WhatsApp number
//             body: 'Dear Customer, please find attached your invoice for the completed trip.',
//             mediaUrl: [publicUrl] // Publicly accessible URL
//         });

//         console.log('WhatsApp message sent:', message.sid);
//     } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//     }
// };

// // sendInvoiceViaWhatsApp('7904505264','invoices/invoice_6752b9510e4a04d984c8de6d.pdf')

// module.exports = { sendInvoiceViaWhatsApp };
