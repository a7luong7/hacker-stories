import React from 'react';
import { getStories } from 'services/hacker-news';
import Spacer from 'components/spacer';
import StorySearchForm from './components/search-form';
import StoryList from './components/story-list';
import { StyledContainer } from './styles';
import StorySorter from './components/story-sorter';
import * as StoryTypes from './types'

const storiesInitialState = {
  stories: [],
  isLoading: false,
  isError: false,
};

const storiesReducer = (state : StoryTypes.StoryState, action : StoryTypes.StoryAction) : StoryTypes.StoryState => {
  switch (action.type) {
    case 'SET_STORIES':
      return { stories: action.stories, isLoading: false, isError: false };
    case 'LOADING_STORIES':
      return { ...state, isLoading: true, isError: false };
    case 'ERROR_STORIES':
      return { stories: [], isLoading: false, isError: true };
    case 'REMOVE_STORY':
      return {
        ...state,
        stories: state.stories.filter((x) => x.objectID !== action.story.objectID),
      };
    default:
      throw new Error(`Unsupported action`);
  }
};

const StorySearch = () => {
  const [storyState, storyStateDispatch] = React.useReducer(storiesReducer, storiesInitialState);
  const [searchedTerms, setSearchedTerms] = React.useState<Array<string>>([]);
  const appendToSearchedTerms = (newTerm : string) => {
    const newSearchedTerms = searchedTerms.concat(newTerm);
    setSearchedTerms(newSearchedTerms);
  };
  const removeStory = (story : StoryTypes.Story) => {
    storyStateDispatch({
      type: 'REMOVE_STORY',
      story,
    });
  };

  const searchStory = React.useCallback(async () => {
    if (searchedTerms.length === 0) return;

    const lastSearchTerm = searchedTerms[searchedTerms.length - 1];
    storyStateDispatch({ type: 'LOADING_STORIES' });

    const storiesResult = await getStories(lastSearchTerm)
      .catch(() => {
        storyStateDispatch({ type: 'ERROR_STORIES' });
      });

    // Timeout is to test loading animation
    setTimeout(() => {
      storyStateDispatch({
        type: 'SET_STORIES',
        stories: storiesResult.hits,
      });
    }, 1200);
  }, [searchedTerms]);

  React.useEffect(() => {
    searchStory()
  }, [searchStory]);

  const [sortState, setSortState] = React.useState<StoryTypes.StorySortState>({});
  const toggleSortState = (column: string) => {
    if (!sortState.column || sortState.column !== column) {
      setSortState({
        column: column,
        direction: 'asc'
      })
    }
    else {
      setSortState({
        column: column,
        direction: sortState.direction === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  let sortedStories = storyState.stories;
  if (sortState.column) {
    switch (sortState.column) {
      case 'Title':
        sortedStories = storyState.stories.sort((a,b)=>{
          if ((a.title||'') > (b.title||'')) return (sortState.direction==='asc' ? 1 : -1);
          if ((a.title||'') < (b.title||'')) return (sortState.direction==='asc' ? -1 : 1);
          return 0;
        });
        break;
      case 'Comments':
        sortedStories = storyState.stories.sort((a,b)=>{
          if ((a.num_comments||0) > (b.num_comments||0)) return (sortState.direction==='asc' ? 1 : -1);
          if ((a.num_comments||0) < (b.num_comments||0)) return (sortState.direction==='asc' ? -1 : 1);
          return 0;
        });
        break;
      case 'Points':
        sortedStories = storyState.stories.sort((a,b)=>{
          if ((a.points||0) > (b.points||0)) return (sortState.direction==='asc' ? 1 : -1);
          if ((a.points||0) < (b.points||0)) return (sortState.direction==='asc' ? -1 : 1);
          return 0;
        });
        break;
      default:
        break;
    }
  }

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
          <StorySorter sortState={sortState} toggleSortState={toggleSortState} />
          <StoryList stories={sortedStories} removeStory={removeStory} />
        </>
        ) }
    </StyledContainer>
  );
};

export default StorySearch;
