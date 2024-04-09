import prisma from '.'
import CustomError from '../errors/CustomError'

export async function addAreaCode(areaCode) {
  try {
    if(!areaCode) {
      throw new CustomError(400)
    }
    const newAreaCode = await prisma.areaCode.create({ data: areaCode })    
    
    return { data: newAreaCode }
  } catch (error) {
    throw error
  }
}

export async function getAllAreaCode() {
  try {
    const areaCodes = await prisma.areaCode.findMany()
    
    return { areaCodes }
  } catch (error) {
    throw error
  }
}