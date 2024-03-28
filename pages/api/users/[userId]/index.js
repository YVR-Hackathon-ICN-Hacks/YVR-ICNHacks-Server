import { getUserById, deleteUserById, updateUserById } from '../../../../lib/prisma/users'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query
      const { user, error } = await getUserById(userId)
      if (error) throw new Error(error)
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if(req.method === 'DELETE') {
    try {
      const { userId } = req.query
      const { user, error } = await deleteUserById(userId)
      if (error) throw new Error(error)
      return res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if(req.method === 'PUT') {
    try {
      const { userId } = req.query
      const dataToUpdate = req.body
      const { user, error } = await updateUserById(userId, dataToUpdate)
      if (error) throw new Error(error)
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
