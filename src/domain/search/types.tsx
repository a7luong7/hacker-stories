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
export type StoryAction = 
  | SetStoryAction 
  | LoadingStoryAction 
  | ErrorStoryAction 
  | RemoveStoryAction;

export default {}