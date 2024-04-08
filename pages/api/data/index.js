import { createData } from '@/lib/prisma/data'
import CustomError from '@/lib/errors/CustomError'
import globalExceptionHandler from '@/lib/utils/globalExceptionHandler'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const newData = req.body
      const { data } = await createData(newData)
      return res.status(200).json({ data })
    }


    res.setHeader('Allow', ['POST'])

    throw new CustomError(405)
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;