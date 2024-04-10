import { updateAbnormalDataById } from '@/lib/prisma/abnormalData'
import globalExceptionHandler from '@/lib/utils/globalExceptionHandler'
import CustomError from '@/lib/errors/CustomError'

const handler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { abnormalDataId } = req.query
      const abnormalDataToUpdate = req.body
      const { abnormalData } = await updateAbnormalDataById(abnormalDataId, abnormalDataToUpdate)
      return res.status(200).json({ abnormalData })
    }

    res.setHeader('Allow', ['PUT'])
    throw new CustomError(405, '')
  } catch (error) {
    globalExceptionHandler(error, req, res)
  }
}

export default handler;