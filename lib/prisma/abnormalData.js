import prisma from '.'
import CustomError from '../errors/CustomError'

export async function createData(data) {
  try {
    if(!data) {
      throw new CustomError(400)
    }
    const newData = await prisma.abnormalData.createMany({ data: data })
    return { data: newData }
  } catch (error) {
    throw error
  }
}

export async function deleteAllData() {
  try {
    const result = await prisma.abnormalData.deleteMany({});

    return { count: result.count }
  } catch (error) {
    throw error
  }
}

export async function getAllData() {
  try {
    const data = await prisma.abnormalData.findMany()
    return { data }
  } catch (error) {
    throw error
  }
}