const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// بيانات الربط مع واتساب
const ULTRA_INSTANCE = "ضع_هنا_رقم_الإنستانس"; 
const ULTRA_TOKEN = "ضع_هنا_التوكن_الخاص_بك";

app.post('/webhook/salla', async (req, res) => {
    const { event, data } = req.body;
    let phone = data.customer ? data.customer.mobile : "";
    let message = "";

    if (event === 'order.created') {
        message = `مرحباً ${data.customer.first_name}، تم استلام طلبك رقم #${data.id} بنجاح! 🎉`;
    }

    if (message && phone) {
        await axios.post(`https://api.ultramsg.com/${ULTRA_INSTANCE}/messages/chat`, {
            token: ULTRA_TOKEN,
            to: phone,
            body: message
        });
    }
    res.status(200).send("OK");
});

app.listen(process.env.PORT || 3000);
