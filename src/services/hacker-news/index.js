import Axios from 'axios'

const baseUrl = `https://hn.algolia.com/`

export const getStories = async (searchTerm) => {
  const url = `${baseUrl}api/v1/search?query=${searchTerm}`
  const response = await Axios.get(url);
  return response.data
}
