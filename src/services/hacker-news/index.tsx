import Axios from 'axios'
import * as StoryTypes from '../../domain/search/types'
import testStories from 'components/../tests/stories/test-stories'

const baseUrl = `https://hn.algolia.com/`

export const getStories = async (searchTerm : string) => {
  //console.log('node env', process.env.REACT_APP_ENV)
  if (process.env.REACT_APP_ENV === 'test') 
    return { hits: testStories };

  const url = `${baseUrl}api/v1/search?query=${searchTerm}`
  const response = await Axios.get(url);
  return response.data
}
