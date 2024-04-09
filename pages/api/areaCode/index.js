import { addAreaCode, getAllAreaCode } from '@/lib/prisma/areaCode'
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
      const { areaCodes } = await getAllAreaCode()
      
      return res.status(200).json({ areaCodes })
    }

    if (req.method === 'POST') {
      const newAreaCode = req.body 
        
      const { areaCode } = await addAreaCode(newAreaCode)      
      return res.status(200).json({ areaCode })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    throw new CustomError(405)
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;