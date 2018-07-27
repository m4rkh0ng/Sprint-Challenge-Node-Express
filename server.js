const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const projectModel = require('./data/helpers/projectModel.js');
const actionModel = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({ hello: 'world', project: "sprint challenge" });
});

// ###### Projects #####

// GET | Returns stored projects

server.get('/projects', (req, res) => {
    projectModel.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get projects.`})
    })
})

// GET | Returns stored project specified by ID

server.get('/projects/:id', (req, res) => {
    const id = req.params.id;

    projectModel.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get project.`})
    })
})

// GET | Returns actions of specified project

server.get('/projects/:id/actions', (req, res) => {
    const id = req.params.id;

    projectModel.get(id)
    .then(response => {
        res.status(200).json({"project ID": id, "actions": response.actions})
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get project's actions.`})
    })
})

//alternatively, above, I could have used getProjectActions from projectModel; if time allows, go back to implement that

// POST | Creates new project

server.post('/projects', (req, res) => {
    const { name, description } = req.body;

    if (!name || name === '' || !description || description === '') {
        console.log("Error Code: ", 400, "Missing name or description");
        res.status(400).json({ errorMessage: "Project is missing name or description" });
        return;
    }
    projectModel.insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json({response, message: "Successfully created new project."});
    })
    .catch(err => {
        res.status(500).json({err, message: "Couldn't create new project."});
    })
})


// ###### Actions #####

// GET | Returns stored actions

server.get('/actions', (req, res) => {
    actionModel.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get actions.`})
    })
})

// GET | Returns stored action specified by ID

server.get('/actions/:id', (req, res) => {
    const id = req.params.id;

    actionModel.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get action.`})
    })
}) 



server.listen(8888, () => console.log("Node-Express API running on port 8888. . ."));

