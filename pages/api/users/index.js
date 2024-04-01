import { createUser, getUsers } from '@/lib/prisma/users'
import CustomError from '@/lib/errors/CustomError'
import NextCors from 'nextjs-cors'
import globalExceptionHandler from '@/lib/utils/globalExceptionHandler'

const handler = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  try {
    if (req.method === 'GET') {
      const { users } = await getUsers()
      return res.status(200).json({ users })
    }

    if (req.method === 'POST') {
      const newUserData = req.body
      const { user } = await createUser(newUserData)
      return res.status(200).json({ user })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    throw new CustomError(405)
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;