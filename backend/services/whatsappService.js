const twilio = require('twilio');

// Twilio credentials
const accountSid = 'your_account_sid';  // Replace with your Twilio Account SID
const authToken = 'your_auth_token';    // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

const sendInvoiceViaWhatsApp = async (customerPhone, filePath) => {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',  // Twilio WhatsApp Sandbox Number
            to: `whatsapp:${customerPhone}`,  // Customer's WhatsApp number
            body: 'Dear Customer, please find attached your invoice for the completed trip.',
            mediaUrl: ['https://your-server-url.com/invoices/invoice.pdf'] // URL pointing to the saved invoice PDF
        });

        console.log('WhatsApp message sent: ', message.sid);
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};

module.exports = {sendInvoiceViaWhatsApp}