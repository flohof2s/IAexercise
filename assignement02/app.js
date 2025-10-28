const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 3000;

app.use(cookieParser('dev-secret'));

app.use(cors());
app.use(express.json());

app.use('/api/salesman', require('./routes/salesmanRoute'));
app.use('/api/socialperformancerecord', require('./routes/socialperformancerecordRoute'));
app.use('/auth', require('./routes/authRoutes'));

app.get("/",(req,res)=>{
    res.send("Welcome at Test API for Integration Architecture");
});

mongoose.set('strictQuery',true);
(async () => {
  try {
    const uri = 'mongodb://127.0.0.1:27017/IA-Exercise';
    await mongoose.connect(uri);

    // RxJS Observer: Demo-Subscriber registrieren
    const eventBus = require('./rx/eventBus');
    eventBus.subscribe({
      next: (evt) => {
        if (evt.type === 'SALESMAN_CREATED') {
          console.log('[Observer] Salesman created:', evt.payload?._id || evt.payload?.id);
        }
      },
      error: (err) => console.error('[Observer] Error:', err),
      complete: () => console.log('[Observer] Completed'),
    });

    app.listen(PORT, () => console.log('Server is listening at Port:', PORT));
  } catch (err) {
    console.error('Mongo-Verbindung fehlgeschlagen:', err);
    process.exit(1);
  }
})();