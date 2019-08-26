import axios from 'axios'

export const getSchema = async (path: string) => {
  const { data = undefined } = await axios.get(path)
  return data
}
