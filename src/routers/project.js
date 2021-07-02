const express = require('express')
const Project = require('../models/project')

const router = new express.Router()

router.post('/projects', async (req, res) => {
    const project = new Project(req.body)

    try {
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/projects/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'start_date', 'end_date', 'risk', 'value', 'participants']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!project) {
            return res.status(404).send()
        }

        res.send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({})
        res.send(projects)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/projects/:id', async (req, res) => {
    const _id = req.params.id

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({ error: 'It not is a valid ObjectId' })
    }

    try {
        const project = await Project.findById(_id)
        
        if (!project) {
            return res.status(404).send()
        }

        res.send(project)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        
        if (!project) {
            return res.status(404).send()
        }

        res.send(project)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router