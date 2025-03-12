import express from 'express'; 
import mongoose from 'mongoose';
import Agent from './Models/AgentModel.js';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); 
app.use('/uploads', express.static('uploads')); 


mongoose.connect('mongodb+srv://indrajeetbhujbal:Indrajeet17@assignment.e1s3c.mongodb.net/assignment')
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Error:', err));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage });

app.post('/createAgent', upload.single("image"), async (req, res) => {
  try {
    const { name, task, description } = req.body;
    const image = req.file ? req.file.filename : null; 

    const agent = new Agent({ name, task, description, image });
    const response = await agent.save();

    res.status(201).json({ message: "Agent Created", agent: response });
  } catch (e) {
    res.status(500).json({ error: "Error creating agent", details: e });
  }
});

app.get('/displayData', async (req, res) => {
  try {
    const data = await Agent.find({});
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error fetching data", details: e });
  }
});

app.put('/updateAgent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedAgent);
  } catch (error) {
    res.status(500).json({ error: "Error updating agent", details: error });
  }
});


app.delete('/deleteAgent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAgent = await Agent.findByIdAndDelete(id);
    res.json(deletedAgent);
  } catch (e) {
    res.status(500).json({ error: "Error deleting agent", details: e });
  }
});

app.get('/searchAgent/:id', async (req,res)=>{
  try{
  const id= req.params.id
  const response= await Agent.findById({_id:id})
  res.send(response)
  }
  catch(e){
    res.send(e)
  }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
