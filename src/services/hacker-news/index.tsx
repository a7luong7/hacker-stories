import Axios from 'axios'
import * as StoryTypes from '../../domain/search/types'

const baseUrl = `https://hn.algolia.com/`

export const getStories = async (searchTerm : string) => {
  const url = `${baseUrl}api/v1/search?query=${searchTerm}`
  const response = await Axios.get(url);
  return response.data
}
