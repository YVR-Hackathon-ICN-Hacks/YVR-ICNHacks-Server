import { getDataByAreaId } from '@/lib/prisma/data'
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
      const { area_id } = req.query

      const { data } = await getDataByAreaId(area_id)
      
      return res.status(200).json({ data })
    }

    res.setHeader('Allow', ['GET'])
    throw new CustomError(405, '')
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;