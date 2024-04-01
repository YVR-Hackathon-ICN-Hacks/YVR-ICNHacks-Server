// lib/prisma/users.js
import prisma from '.'
import CustomError from '../errors/CustomError'

async function checkUserExists(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  if(!user) {
    throw new CustomError(404, '')
  }

  return user
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    throw error
  }
}

export async function createUSer(user) {
  try {
    if(!user) {
      throw new CustomError(400, '')
    }
    const newUser = await prisma.user.create({ data: user })
    return { user: newUser }
  } catch (error) {
    throw error
  }
}

export async function getUserById(id) {
  try {
    const user = await checkUserExists(id);
    return { user };
  } catch (error) {
    throw error
  }
}

export async function deleteUserById(id) {
  try {
    await checkUserExists(id)
    const deletedUser = await prisma.user.delete({ where: { id }})
    return { user: deletedUser }
  } catch (error) {
    throw error
  }
}

export async function updateUserById(id, dataToUpdate) {
  try {
    await checkUserExists(id)
    const updateUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })
    return { user: updateUser }
  } catch (error) {
    throw error
  }
}