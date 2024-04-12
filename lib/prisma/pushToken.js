import prisma from '.'
import CustomError from '../errors/CustomError'

export async function createPushToken(pushToken) {
  try {
    if(!pushToken) {
      throw new CustomError(400)
    }
    const newData = await prisma.data.create({ pushToken: pushToken })
    return { pushToken: newData }
  } catch (error) {
    throw error
  }
}

export async function getAllPushToken() {
  try {
    const data = await prisma.data.findMany()
    return { pushToken }
  } catch (error) {
    throw error
  }
}