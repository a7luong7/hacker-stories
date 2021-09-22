import Axios from 'axios'
import testStories from 'components/../tests/stories/test-stories'

const baseUrl = `https://hn.algolia.com/`

export const getStories = async (searchTerm : string, page? : number) => {
  if (process.env.REACT_APP_ENV === 'test') 
    return { hits: testStories };

  let url = `${baseUrl}api/v1/search?query=${searchTerm}`
  if (page)
    url += `&page=${page}`;
  const response = await Axios.get(url);
  return response.data
}
