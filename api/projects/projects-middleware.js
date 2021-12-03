// add middlewares here related to projects
const Projects = require('./projects-model')
const yup = require('yup')

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'oh no, something went wrong!'
    })
}

const projectSchema = yup.object().shape({
    name: yup.string().trim().required('Name required!'),
    description: yup.string().trim().required('Description required!'),
    completed: yup.boolean().required()
})

async function validateProject(req, res, next) {
    try {
        const validated = await projectSchema.isValid(req.body)
        if(!validated) {
            res.status(400).json({
                message: "The following fields are required!"
            })
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            req.project = project
            next();
        } else {
            res.status(404).json({
                message: "desired project not found"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleError,
    validateProject,
    validateProjectId,
}