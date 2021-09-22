export type Story = {
  objectID: string,
  title?: string,
  author?: string,
  num_comments?: number,
  points?: number,
}

export type StoryResponse = {
  hits: Array<Story>
}

export type StoryState = {
  stories: Array<Story>,
  // currentPage: number,
  // maxPages: number,
  isLoading: boolean,
  isError: boolean
}

interface SetStoryAction {
  type: 'SET_STORIES',
  stories: Array<Story>
}
interface LoadingStoryAction {
  type: 'LOADING_STORIES'
}
interface ErrorStoryAction {
  type: 'ERROR_STORIES'
}
interface RemoveStoryAction {
  type: 'REMOVE_STORY',
  story: Story
}
// interface SetStoryPageAction {
//   type: 'SET_PAGE',
//   currentPage: number,
//   maxPages: number
// }
export type StoryAction = 
  | SetStoryAction 
  | LoadingStoryAction 
  | ErrorStoryAction 
  | RemoveStoryAction
  //| SetStoryPageAction
  ;

  export type StorySortState = {
    column?: string,
    direction?: 'asc' | 'desc'
  }

export default {}