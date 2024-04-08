import prisma from '.'
import CustomError from '../errors/CustomError'

export async function createData(data) {
  try {
    if(!data) {
      throw new CustomError(400)
    }
    const newData = await prisma.data.createMany({ data: data })
    return { data: newData }
  } catch (error) {
    throw error
  }
}