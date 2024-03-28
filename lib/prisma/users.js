import prisma from '.'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    return { error }
  }
}

export async function createUser(user) {
  try {
    const userFromDB = await prisma.user.create({ data: user })
    return { user: userFromDB }
  } catch (error) {
    return { error }
  }
}

export async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },      
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function deleteUserById(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    })
    return { user: deletedUser }
  } catch (error) {
    return { error }
  }
}

export async function updateUserById(id, dataToUpdate) {
  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })
    return { user: updateUser }
  } catch (error) {
    return { error }
  }
}