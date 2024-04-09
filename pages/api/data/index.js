import { createData, deleteAllData, getAllData } from '@/lib/prisma/data'
import CustomError from '@/lib/errors/CustomError'
import globalExceptionHandler from '@/lib/utils/globalExceptionHandler'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const newData = req.body
      const { data } = await createData(newData)
      return res.status(200).json({ data })
    }

    if (req.method === 'DELETE') {
      const { count } = await deleteAllData()
      return res.status(200).json({ message: `${count} data deleted successfully` })
    }

    if (req.method === 'GET') {
      const { data } = await getAllData()
      return res.status(200).json({ data })
    }


    res.setHeader('Allow', ['POST', 'DELETE', 'GET'])

    throw new CustomError(405)
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;