import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    if (!username || !email || !password) {
      const error = new Error('username, email and password are required')
      error.status = 400
      throw error
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!regex.test(password)) {
      const error = new Error(
        'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 6 characters'
      )
      error.status = 400
      throw error
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const userFromDB = await User.create({
      username,
      email,
      passwordHash,
    })

    res.status(201).json({ username, email, id: userFromDB.id })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      error.status = 400
      next(error)
    }
    if (error.code === 11000) {
      error.message = 'username or email already exists'
      error.status = 400
      next(error)
    }
    console.log(error)
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      const error = new Error('Password and email are required')
      error.status = 400
      throw error
    }

    const userFromDB = await User.findOne({ email })

    if (!userFromDB) {
      const error = new Error('User not found')
      error.status = 401
      throw error
    }

    const verify = bcrypt.compareSync(password, userFromDB.passwordHash)

    if (!verify) {
      const error = new Error('Invalid Password')
      error.status = 401
      throw error
    }

    const payload = {
      id: userFromDB.id,
      username: userFromDB.username,
      email: userFromDB.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '6h',
    })

    res.status(200).json({ username: userFromDB.username, token })
  } catch (error) {
    next(error)
  }
})

export default router
