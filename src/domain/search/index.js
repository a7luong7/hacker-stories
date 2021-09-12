import React from 'react';
import { getStories } from 'services/hacker-news';
import Spacer from 'components/spacer';
import StorySearchForm from './components/search-form';
import StoryList from './components/story-list';
import { StyledContainer } from './styles';

const storiesInitialState = {
  stories: [],
  isLoading: false,
  isError: false,
};
const storiesActions = {
  SET_STORIES: 'SET_STORIES',
  LOADING_STORIES: 'LOADING_STORIES',
  ERROR_STORIES: 'ERROR_STORIES',
  REMOVE_STORY: 'REMOVE_STORY',
};
const storiesReducer = (state, action) => {
  switch (action.type) {
    case storiesActions.SET_STORIES:
      return { stories: action.stories, isLoading: false, isError: false };
    case storiesActions.LOADING_STORIES:
      return { ...state, isLoading: true, isError: false };
    case storiesActions.ERROR_STORIES:
      return { stories: [], isLoading: false, isError: true };
    case storiesActions.REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter((x) => x.objectID !== action.story.objectID),
      };
    default:
      throw new Error(`Unsupported action: ${action.type}`);
  }
};

const StorySearch = () => {
  // const [stories, setStories] = React.useState([]);
  const [storyState, storyStateDispatch] = React.useReducer(storiesReducer, storiesInitialState);
  const [searchedTerms, setSearchedTerms] = React.useState([]);
  const appendToSearchedTerms = (newTerm) => {
    const newSearchedTerms = searchedTerms.concat(newTerm);
    setSearchedTerms(newSearchedTerms);
  };
  const removeStory = (story) => {
    storyStateDispatch({
      type: storiesActions.REMOVE_STORY,
      story,
    });
  };

  React.useEffect(async () => {
    if (searchedTerms.length === 0) return;

    const lastSearchTerm = searchedTerms[searchedTerms.length - 1];
    storyStateDispatch({ type: storiesActions.LOADING_STORIES });

    const storiesResult = await getStories(lastSearchTerm)
      .catch(() => {
        // console.log('error getting stories', error);
        storyStateDispatch({ type: storiesActions.ERROR_STORIES });
      });

    // Timeout is to test loading animation
    setTimeout(() => {
      storyStateDispatch({
        type: storiesActions.SET_STORIES,
        stories: storiesResult.hits,
      });
    }, 1200);
  }, [searchedTerms]);

  return (
    <StyledContainer>
      {/* <SearchedTerms searchedTerms={searchedTerms} /> */}
      <StorySearchForm
        isLoading={storyState.isLoading}
        appendToSearchedTerms={appendToSearchedTerms}
      />

      {storyState.isLoading && <div>Loading stories...</div>}
      {storyState.isLoading
        || storyState.isError
        || searchedTerms.length === 0
        || (
        <>
          <Spacer />
          <StoryList stories={storyState.stories} removeStory={removeStory} />
        </>
        ) }
    </StyledContainer>
  );
};

export default StorySearch;
