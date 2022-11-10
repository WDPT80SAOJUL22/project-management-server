import { Router } from 'express'
import Project from '../models/Project.model.js'

const router = Router()

router.post('/project', async (req, res, next) => {
  const { title, description } = req.body

  try {
    const newProject = await Project.create({
      title,
      description,
      author: req.user.id,
    })
    res.status(200).json(newProject)
  } catch (error) {
    next(error)
  }
})

export default router
