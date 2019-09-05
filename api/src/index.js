const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const Thing = mongoose.model('Thing', { name: String });

const app = express();

app.use(bodyParser.json()).use(cors());

// get all things
app.get('/things', async (req, res) => {
  const things = await Thing.find();
  res.json({ success: true, result: things });
});

// create a random thing
app.post('/things', async (req, res) => {
  const newThing = new Thing({ name: faker.name.findName() });
  await newThing.save();
  res.json({ success: true, result: newThing });
});

// delete existing thing
app.delete('/things/:id', async (req, res) => {
  await Thing.findByIdAndRemove(req.params.id);
  res.json({ success: true });
});

const port = process.env.PORT;
app.listen(process.env.PORT, () => console.log(`API is listening on :${port}`));
