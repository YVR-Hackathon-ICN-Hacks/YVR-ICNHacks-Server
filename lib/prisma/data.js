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

export async function getDataByDateAndAreaId(date, area_id) {
  try {
    
    const startDate = new Date(date);
    startDate.setHours(17, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(40, 59, 59, 999);

    const data = await prisma.data.findMany({
      where: {
        area_id: area_id,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    })
    
    return { data };
  } catch (error) {
    throw error
  }
}

export async function deleteAllData() {
  try {
    const result = await prisma.data.deleteMany({});

    return { count: result.count }
  } catch (error) {
    throw error
  }
}

export async function getAllData() {
  try {
    const data = await prisma.data.findMany()
    return { data }
  } catch (error) {
    throw error
  }
}