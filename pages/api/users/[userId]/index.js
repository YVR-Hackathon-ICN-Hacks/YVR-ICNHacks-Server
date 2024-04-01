// pages/apiece/users/[userId]/index.js
import { getUserById, deleteUserById, updateUserById } from '@/lib/prisma/users'
import globalExceptionHandler from '@/lib/utils/globalExceptionHandler'
import NextCors from 'nextjs-cors'
import CustomError from '@/lib/errors/CustomError'

const handler = async (req, res) => {
  // TODO: update origin to access only from allowed url
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  try {
    if (req.method === 'GET') {
      const { userId } = req.query
      const { user } = await getUserById(userId)
      return res.status(200).json({ user })
    }

    if (req.method === 'DELETE') {
      const { userId } = req.query
      const { user, error } = await deleteUserById(userId)
      return res.status(204).json({ user })
    }

    if (req.method === 'PUT') {
      const { userId } = req.query
      const dataToUpdate = req.body
      const { user, error } = await updateUserById(userId, dataToUpdate)
      return res.status(200).json({ user })
    }

    res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
    throw new CustomError(405, '')
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;