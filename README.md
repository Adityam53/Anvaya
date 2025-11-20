# Anvaya CRM

A full-stack customer relationship management app where you can browse, add, edit and delete leads and sales Agent. Detailes of lead and sales Agent, with management of both.
Developed using React JS, React Router, Express, Node JS and MongoDb database.

## Demo Link

[Live Demo](https://anvaya-mauve.vercel.app/)

## Quick Start

git clone https://github.com/Adityam53/Anvaya.git
cd Anvaya
cd Front-End
npm install
npm run dev

## Technologies

- React JS
- React Router
- Express
- Node JS
- MongoDB

## Demo Video

Watch a walkthrough (5-7 minutes) of all major features of this app:[Loom Video](https://www.loom.com/share/581b05b262594e74a6fd8ffaaffec1d6)

## Features

**Home**

- Dashboard displaying Latest Leads.
- Leads count by their status.
- And Filtering by their status.

**Leads**

- List of leads displaying their name, status, agent assigned etc.
- Filtering by agent, priority and time to close.
- Sorting by priority and time to close.
- Add New Lead.

**Agents**

- List of Agents displaying their name and email address.
- Add New Agent.

**Leads By Status**

- List of Agents.
- Filtering on each lead status.
- Filter by Agent and priority in each status type.

**Lead Details**

- Details of leads such as name, agent assigned, time to close, priority, tags, status and source.
- Edit Details.
- Add Comment.
- Display Comment.

**Agent Details**

- Agent Name
- Leads Assigned to the agent.
- Filtering based on status and priority.

**Reports**

- Bar chart displaying Leads Closed in last week.
- Doughnut Chart displaying total leads in pipeline.
- Pie Chat displaying number of leads closed by each salesAgent.

**Settings**

- Manage Leads And Agents.
- Delete Leads.
- Delete Agents.

## API Reference

### **GET/API/Leads**<br>

List All Leads<br>
Sample Response:<br>

```
[{_id,name,source,tags},...]
```

### **GET/API/Agents**<br>

List All Agents<br>
Sample Response:<br>

```
[{_id,name,email},...]

```

### **GET/API/Leads/:id**<br>

Lead By Id<br>
Sample Response:<br>

```
{_id,name,source,tags}
```

### **GET/API/Agents/:id**<br>

Agent By Id<br>
Sample Response:<br>

```
{_id,name,email}
```

### **POST /api/Agents**<br>

Create a new Agent (protected)
Sample Response:
{\_id, name, email, ... }

### **POST /api/Leads**<br>

Create a new lead (protected)
Sample Response:
{\_id, name, source, ... }

## Contact

For bugs or feature requests, please reach out to (adityamoorjmalani53@gamil.com)
