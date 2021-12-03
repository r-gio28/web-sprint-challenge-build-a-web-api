// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if (projects) {
                res.status(200).json(projects)
        } else {
            res.status(200).json([])
        }
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({
            message: "Error ocurred while fetching projects"
        })
    })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then( project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: "Project with requested id was not found"
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error ocurred while fetching projects"
        })
    }) 
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if(newProject.name && newProject.description) {
        Projects.insert(newProject)
        .then ( project => {
            res.status(201).json(project)
        })
        .catch ( error => {
            console.log(error)
            res.status(500).json({
                message: "Error ocurred while fetching projects"
            })
        })
    } else {
        res.status(400).json({
            message: "Name and description are required"
        })
    }
})
module.exports = router;
