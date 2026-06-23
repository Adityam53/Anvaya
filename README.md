# Ascendra CRM

A full-stack customer relationship management app where you can browse, add, edit and delete leads and sales Agent. Detailes of lead and sales Agent, with management of both.
Developed using React JS, React Router, Express, Node JS and MongoDb database.

## Demo Link

[Live Demo](https://anvaya-mauve.vercel.app/)

## Quick Start

```
git clone https://github.com/Adityam53/Anvaya.git
cd Anvaya
cd Front-End
npm install
npm run dev
```

## Technologies

- React JS
- React Router
- Express
- Node JS
- MongoDB

## Demo Video

Watch a walkthrough (3 minutes) of all major features of this app:[Loom Video](https://www.loom.com/share/581b05b262594e74a6fd8ffaaffec1d6)

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

This is a REST API for managing Sales Agents, Leads, Comments, Tags, and Reports.

---

# Agents APIs

## Get All Agents
GET /agents

Response:
```json
[
  {
    "_id": "65f456def789",
    "name": "Sarah Johnson",
    "email": "sarah@email.com"
  }
]

```

## Get Agent by ID

GET /agents/:id

Response:
```json
{
  "_id": "65f456def789",
  "name": "Sarah Johnson",
  "email": "sarah@email.com"
}
```

POST /agents

## Create a new agent.

Request:
```json

{
  "name": "Sarah Johnson",
  "email": "sarah@email.com",
  "password": "hashedPassword"
}
```
Response:
```json
{
  "message": "New Sales agent created successfully!",
  "savedAgent": {
    "_id": "65f456def789",
    "name": "Sarah Johnson",
    "email": "sarah@email.com"
  }
}
```
DELETE /agents/:id

## Delete an agent.

Response:
```json
{
  "_id": "65f456def789",
  "name": "Sarah Johnson",
  "email": "sarah@email.com"
}
```
## Leads APIs
GET /leads

###Fetch all leads (supports filters).

## Query params:
salesAgent, status, priority, source, tags

Response:
```json
[
  {
    "_id": "lead123",
    "name": "ABC Company",
    "source": "Website",
    "salesAgent": {
      "name": "Sarah Johnson",
      "email": "sarah@email.com"
    },
    "status": "New",
    "tags": ["Hot"],
    "priority": "High"
  }
]
```
GET /leads/:id

## Fetch lead by ID.

Response:
```json
{
  "_id": "lead123",
  "name": "ABC Company",
  "source": "Website",
  "salesAgent": {
    "name": "Sarah Johnson",
    "email": "sarah@email.com"
  },
  "status": "Negotiation",
  "tags": ["Hot"],
  "priority": "High"
}
```
GET /leads/agent/:agentId

## Fetch leads for a specific agent.

## Query params:
status, priority

Response:
```json
[
  {
    "_id": "lead123",
    "name": "ABC Company",
    "status": "New",
    "salesAgent": {
      "name": "Sarah Johnson",
      "email": "sarah@email.com"
    }
  }
]
```
POST /leads

## Create a new lead.

Request:
```json
{
  "name": "ABC Company",
  "source": "Website",
  "salesAgent": "agentId",
  "status": "New",
  "priority": "High",
  "tags": ["Hot"]
}
```
Response:
```json
{
  "message": "New Lead created successfully!",
  "savedLead": {
    "_id": "lead123",
    "name": "ABC Company",
    "status": "New",
    "closedAt": null
  }
}
```
PUT /leads/:id

## Update a lead.

Request:
```json
{
  "status": "Closed",
  "priority": "Medium"
}
```
Response:
```json
{
  "_id": "lead123",
  "status": "Closed",
  "closedAt": "2026-06-23T10:00:00.000Z"
}
```
DELETE /leads/:id

## Delete a lead.

Response:
```json
{
  "message": "Lead deleted successfully",
  "deletedLead": {
    "_id": "lead123",
    "name": "ABC Company"
  }
}
```
Comments APIs
GET /leads/:id/comments

## Fetch comments for a lead.

Response:
```json
[
  {
    "_id": "c1",
    "text": "Followed up with client",
    "lead": {
      "name": "ABC Company"
    },
    "author": {
      "name": "Sarah Johnson",
      "email": "sarah@email.com"
    }
  }
]
```
POST /leads/:id/comments

## Add a comment.

Request:
```json
{
  "text": "Client is interested",
  "lead": "leadId",
  "author": "agentId"
}
```
Response:
```json
{
  "message": "Comment added successfully!",
  "savedComment": {
    "_id": "c1",
    "text": "Client is interested"
  }
}
```
## Tags APIs
GET /tags

## Fetch all tags.

Response:
```json
[
  {
    "_id": "t1",
    "name": "Hot"
  }
]
```
POST /tags

## Create a tag.
```json
Request:

{
  "name": "Hot"
}
```
Response:
```json
{
  "message": "Tag created successfully!",
  "tag": {
    "_id": "t1",
    "name": "Hot"
  }
}
```
## Reports APIs
GET /report/last-week

## Leads closed in last 7 days.

Response:
```json
{
  "success": true,
  "totalClosedLeads": 5,
  "data": [
    {
      "date": "2026-06-22",
      "closedCount": 2
    }
  ]
}
```
GET /report/closed-by-agent

## Closed leads grouped by agent.

Response:
```json
{
  "success": true,
  "totalAgents": 3,
  "data": [
    {
      "salesAgentName": "Sarah Johnson",
      "closedLeadsCount": 10
    }
  ]
}
```

GET /report/pipeline
## Pipeline distribution.

Response:
```json
{
  "success": true,
  "totalPipelineLeads": 25,
  "data": [
    {
      "status": "New",
      "totalLeads": 10
    }
  ]
}
```
## Contact

For bugs or feature requests, please reach out to (adityamoorjmalani53@gamil.com)

