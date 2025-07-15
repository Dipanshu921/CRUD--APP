import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
app.use(cors()); // did this for cross-origin-resource sharing so that api can be accessed frm anywhere
app.use(bodyParser.json()); // extreact data from form
 
let employees = [];
let idCounter = 1;

app.get('/employees', (req, res) => res.json(employees));
app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  res.json(emp || {});
});
app.post('/employees', (req, res) => {
  const emp = { id: idCounter++, ...req.body };
  employees.push(emp);
  res.json(emp);
});
app.put('/employees/:id', (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);
  employees[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(employees[index]);
});
app.delete('/employees/:id', (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
