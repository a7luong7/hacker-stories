import React from 'react';
import Chip from 'components/chip';
import * as ButtonStyled from 'components/button/styles';
import { IconWithLoad, Icon } from 'components/icons';
import * as TextStyled from 'components/text/styles';
import * as StoryStyled from './styles';
import * as StoryTypes from '../../types'
import styled from 'styled-components';

const FlexRow = styled.div`
display:flex
`

const StoryList = ({ 
  stories, 
  removeStory 
} : {
  stories : Array<StoryTypes.Story>,
  removeStory: (story : StoryTypes.Story) => void
}) => {
  if (stories.length === 0) { return (<div>No stories found</div>); }
  return (
    <div>
      <StorySorter />
      {stories.map((story) => (
        <Story
          key={story.objectID}
          story={story}
          removeStory={removeStory}
        />
      ))}
    </div>
  );
};

type StorySortState = {
  column?: string,
  direction?: 'asc' | 'desc'
}

const StorySorter = () => {
  const [sortState, setSortState] = React.useState<StorySortState>({});
  const toggleSortState = (column:string) => {
    if (!sortState.column || sortState.column !== column)
    {
      setSortState({
        column:column,
        direction: 'asc'
      })
    }
    else {
      setSortState({
        column:column,
        direction: sortState.direction === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  return (<FlexRow>
    <div style={{ marginRight: 'auto' }}>
      <StorySorterItem 
        label="Title" 
        sortState={sortState} 
        toggleSort={()=>toggleSortState('Title')} />
    </div>
    <div style={{ width: '12%' }}>
      <StorySorterItem 
        label="Comments" 
        sortState={sortState} 
        toggleSort={()=>toggleSortState('Comments')} />
    </div>
    <div style={{ width: '12%' }}>
      <StorySorterItem 
        label="Points" 
        sortState={sortState} 
        toggleSort={()=>toggleSortState('Points')} />
    </div>
    <div style={{ width: '10%' }} />
  </FlexRow>)
}


const StorySorterItem = ({ label, sortState, toggleSort } : { 
  label:string, 
  sortState:StorySortState,
  toggleSort: () => void  
}) => {
  const isSortingAsc = sortState.column === label && sortState.direction === 'asc';
  const isSortingDesc = sortState.column === label && sortState.direction === 'desc';
  return (<FlexRow>
    <TextStyled.Semibold >{label}</TextStyled.Semibold>
    <div onClick={toggleSort} style={{ cursor:'pointer' }}>
      <Icon icon="long-arrow-alt-up" color={isSortingAsc ? "inherit" : "#aaa"}/>
      <Icon icon="long-arrow-alt-down" color={isSortingDesc ? "inherit" : "#aaa"} />
    </div>

  </FlexRow>)
}

const Story = ({ 
  story, 
  removeStory 
} : {
  story: StoryTypes.Story,
  removeStory: (story : StoryTypes.Story) => void
}) => {
  // eslint-disable-next-line no-unused-vars
  const placeholder = 1;
  return (
    <StoryStyled.Story>
      <div style={{ marginRight: 'auto' }}>
        <TextStyled.Title>{story.title}</TextStyled.Title>
        <TextStyled.Muted>
          Author:
          {' '}
          {story.author}
        </TextStyled.Muted>
      </div>
      <div style={{ width: '12%' }}><Chip color="secondary" title="Comments">{story.num_comments}</Chip></div>
      <div style={{ width: '12%' }}><Chip color="secondary" title="Points">{story.points}</Chip></div>
      <div style={{ width: '10%', textAlign: 'right' }}>
        <ButtonStyled.Outline  onClick={() => removeStory(story)} ripple $color="primary" type="button">Dismiss</ButtonStyled.Outline>
      </div>
    </StoryStyled.Story>
  );
};

export default StoryList;
