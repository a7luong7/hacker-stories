import React from 'react';
import Chip from 'components/chip';
import * as ButtonStyled from 'components/button/styles';
import * as TextStyled from 'components/text/styles';
import * as StoryStyled from './styles';
import * as StoryTypes from '../../types'

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
      {stories.map((story) => (
        <Story
          key={story.objectId}
          story={story}
          removeStory={removeStory}
        />
      ))}
    </div>
  );
};

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
      <div style={{ width: '10%' }}><Chip color="secondary" title="Comments">{story.num_comments}</Chip></div>
      <div style={{ width: '10%' }}><Chip color="secondary" title="Points">{story.points}</Chip></div>
      <div style={{ width: '10%', textAlign: 'right' }}>
        <ButtonStyled.Outline  onClick={() => removeStory(story)} ripple $color="primary" type="button">Dismiss</ButtonStyled.Outline>
      </div>
    </StoryStyled.Story>
  );
};

export default StoryList;
