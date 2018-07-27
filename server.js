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

    //both name & description are required in the body
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

// PUT | Updates an existing project

server.put('/projects/:id', (req,res) => {
    const id = req.params.id;
    const { name, description, completed } = req.body;
    const changes = req.body;
    
    //not including actions here, to have that be updated via other PUT directly with actionModel.update(id) instead

    if ( !name && !description && !completed ) {
            res.status(400).json({ errorMessage: "Please update project name, description or the completed flag."});
            return;
    }

    projectModel.update(id, changes)
    .then(response => {
        res.status(200).json({id, response, message: "Project updated successfully."})
    })
    .catch(err => {
        res.status(500).json({err, message: `Couldn't update project ${id}.`})
    })
})

// DELETE | Deletes an existing project

server.delete('/projects/:id', (req, res) => {
    const id = req.params.id;

    //need to ask about when the specified ID doesn't exist

    projectModel.remove(id)
    .then(response => {
        if (response === 0) {
            res.status(404).json({ response, message: `Project ${id} does not exist. Cannot delete.`});
            return;
        }
        res.status(200).json({ response, message: `Project ${id} deleted successfully.`});
    })
    .catch(err => {
        res.status(500).json({err, message: `Couldn't delete project ${id}.`});
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

// POST | Create actions

server.post('/actions', (req, res) => {
    const { project_id, description, notes } = req.body;
    const action = req.body;
    // all three project_id, description, & notes are required in the body
    // excluded completed because it, by default, should be false; include completed in the PUT instead

    if ( !project_id || project_id === '' || !description || description === '' || !notes || notes === '' ) {
        res.status(400).json({ errorMessage: "Project is missing project_id, description, or notes. All three are required, so please enter them in." });
        return;
    }

    actionModel.insert(action)
    .then(response => {
        res.status(201).json({response, message: "Successfully created new action."});
    })
    .catch(err => {
        res.status(500).json({err, message: "Couldn't create new action."});
    })
})

server.put('/actions/:id', (req, res) => {
    const id = req.params.id;
    const { project_id, description, notes, completed } = req.body;
    const changes = req.body;
    
    //needs constraint on being able to update project_id to a non-existing project number; ask about how to write a get within this put to check if project exists

    if(!project_id && !description && !notes && !completed) {
        res.status(400).json({message: 'Please provide information to update with.'});
    }

    actionModel.update(id, changes)
    .then(response => {
        res.status(200).json({ response, message: `Action #${id} has been updated.` });
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The action could not be updated."})
    })
})

server.delete('/actions/:id', (req, res) => {
    const id = req.params.id;

    actionModel.remove(id)
    .then(response => {
        if(response === 0) {
            res.status(404).json({response, message: `Action #${id} does not exist.`});
            return;
        }
        res.status(200).json({response, message: `Action #${id} has been deleted.`})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: `The action could not be deleted.`});
    })
})


server.listen(8888, () => console.log("Node-Express API running on port 8888. . ."));

