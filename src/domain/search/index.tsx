import React, { useRef } from 'react';
import { getStories } from 'services/hacker-news';
import Spacer from 'components/spacer';
import StorySearchForm from './components/search-form';
import StoryList from './components/story-list';
import { StyledContainer, Container } from './styles';
import StorySorter from './components/story-sorter';
import sortStories from 'services/sort-stories';
import * as StoryTypes from './types'
import LastSearches from './components/last-searches';

const storiesInitialState = {
  stories: [],
  currentPage: 0,
  maxPages: 0,
  isLoading: false,
  isError: false,
};

const storiesReducer = (state : StoryTypes.StoryState, action : StoryTypes.StoryAction) : StoryTypes.StoryState => {
  switch (action.type) {
    case 'SET_STORIES':
      return { ...state, stories: action.stories, isLoading: false, isError: false };
    case 'LOADING_STORIES':
      return { ...state, isLoading: true, isError: false };
    case 'ERROR_STORIES':
      return { ...state, stories: [], isLoading: false, isError: true };
    case 'REMOVE_STORY':
      return {
        ...state,
        stories: state.stories.filter((x) => x.objectID !== action.story.objectID),
      }
    default:
      throw new Error(`Unsupported action`);
  }
};

type PageState = {
  currentPage: number,
  maxPages: number
}

const StorySearch = () => {
  const [storyState, storyStateDispatch] = React.useReducer(storiesReducer, storiesInitialState);
  const [searchedTerms, setSearchedTerms] = React.useState<Array<string>>([]);
  const [pageState, setPageState] = React.useState<PageState|null>(null);
  const searchFormRef = useRef<any|null>(null);
  const maxLastSearches = 6;

  const appendToSearchedTerms = (newTerm : string) => {
    //Do not show duplicated searches if searched term was within previous searches
    let newSearchedTerms = searchedTerms
      .filter(x=>x.trim().toUpperCase() != newTerm.trim().toUpperCase())
      .concat(newTerm);
    
    //If searching by last searched term, do not change anything
    const isSameAsLastSearch = searchedTerms.length > 0 
      ? searchedTerms[searchedTerms.length-1].trim().toUpperCase() === newTerm.trim().toUpperCase() 
      : false;
    if (isSameAsLastSearch)
      return;

    //Only display last 5 searches
    if (newSearchedTerms.length > maxLastSearches)
      newSearchedTerms = newSearchedTerms.slice(-1 * maxLastSearches);

    //Set search form input to match last search
    setSearchedTerms(newSearchedTerms);
    if (searchFormRef.current)
      searchFormRef.current.setInput(newTerm);
  };

  const removeStory = (story : StoryTypes.Story) => {
    storyStateDispatch({
      type: 'REMOVE_STORY',
      story,
    });
  };

  const handleSearch = async (pageNumber : number) => {
    const lastSearchTerm = searchedTerms[searchedTerms.length - 1];   
    storyStateDispatch({ type: 'LOADING_STORIES' });
    const storiesResult = await getStories(lastSearchTerm, pageNumber)
      .catch(() => {
        storyStateDispatch({ type: 'ERROR_STORIES' });
      });

    setPageState({
      currentPage: storiesResult.page,
      maxPages: storiesResult.nbPages
    })
    return storiesResult.hits
  }

  const searchStory = React.useCallback(async () => {
    if (searchedTerms.length === 0) return;
    const stories = await handleSearch(0);
    // Timeout is to test loading animation
    setTimeout(() => {
      storyStateDispatch({
        type: 'SET_STORIES',
        stories: stories,
      });
    }, 2200);
  }, [searchedTerms]);

  React.useEffect(() => {
    searchStory()
  }, [searchStory]);

  const loadMoreStories = async () => {
    const nextPage = pageState ? pageState.currentPage+1 : 0;
    const stories = await handleSearch(nextPage);
    storyStateDispatch({
      type: 'SET_STORIES',
      stories: storyState.stories.concat(stories),
    });
  }

  const [sortState, setSortState] = React.useState<StoryTypes.StorySortState>({});
  const toggleSortState = (column: string) => {
    const isReverse = sortState.column === column && sortState.direction === 'asc';
    setSortState({
      column: column,
      direction: isReverse ? 'desc' : 'asc'
    })
  }
  let sortedStories = sortStories(sortState,storyState.stories);
  
  const lastSearchTermsExcludingCurrent = searchedTerms.length > 0
    ? searchedTerms.slice(0,-1)
    : []

  return (
    <>
      <Container>
        <LastSearches 
          searchedTerms={lastSearchTermsExcludingCurrent} 
          appendToSearchedTerms={appendToSearchedTerms} />
      </Container>
      <StyledContainer>
        {/* <SearchedTerms searchedTerms={searchedTerms} /> */}

        <StorySearchForm
          ref={searchFormRef}
          isLoading={storyState.isLoading}
          appendToSearchedTerms={appendToSearchedTerms}
        />
        
        {
          (storyState.isLoading && storyState.stories.length === 0)
          || storyState.isError
          || searchedTerms.length === 0
          || (
            <>
              <Spacer />
              <StorySorter sortState={sortState} toggleSortState={toggleSortState} />
              <StoryList stories={sortedStories} removeStory={removeStory} />
              <button type="button" onClick={loadMoreStories} disabled={storyState.isLoading}>More</button>
            </>
          )}
          {storyState.isLoading && <div>Loading stories...</div>}
      </StyledContainer>
    </>
  );
};

export default StorySearch;
