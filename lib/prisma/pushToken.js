import prisma from '.'
import CustomError from '../errors/CustomError'

export async function createPushToken(pushToken) {
  try {
    if(!pushToken) {
      throw new CustomError(400)
    }
    const newData = await prisma.pushToken.create({ data: pushToken })
    return { pushToken: newData }
  } catch (error) {
    throw error
  }
}

export async function getAllPushToken() {
  try {
    const data = await prisma.pushToken.findMany()
    return { data }
  } catch (error) {
    throw error
  }
}