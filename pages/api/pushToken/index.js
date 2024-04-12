import { createPushToken, getAllPushToken } from '@/lib/prisma/pushToken'
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
      const { data } = await getAllPushToken()
      return res.status(200).json({ data })
    }

    if (req.method === 'POST') {
      const newPushToken = req.body
      const { pushToken } = await createPushToken(newPushToken)
      return res.status(200).json({ pushToken })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    throw new CustomError(405)
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;