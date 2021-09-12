import React from 'react';
import styled from 'styled-components';
import { StyledButton, StyledButtonOutline } from 'components/button';
import Chip from 'components/chip';

const StyledStory = styled.div`
  display:flex;
  align-items:center;
  border-radius:0.25rem;
  padding:0.25rem;
  margin-bottom:0.25rem;
  &:hover {
    background-color: rgba(0,0,0,0.075)
  }
`;

const Texttile = styled.div`
  font-size:1em
`;
const TextMuted = styled.div`
  font-size:0.8em;
  color:#aaa
`;

const StoryList = ({ stories, removeStory }) => {
  if (stories.length === 0) { return (<div>No stories found</div>); }
  return (
    <div>
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

const Story = ({ story, removeStory }) => {
  const dogs = 1;
  return (
    <StyledStory>
      <div style={{ marginRight: 'auto' }}>
        <Texttile>{story.title}</Texttile>
        <TextMuted>
          Author:
          {' '}
          {story.author}
        </TextMuted>
      </div>
      <div style={{ width: '10%' }}><Chip color="secondary" title="Comments">{story.num_comments}</Chip></div>
      <div style={{ width: '10%' }}><Chip color="secondary" title="Points">{story.points}</Chip></div>
      <div style={{ width: '10%', textAlign: 'right' }}>
        <StyledButtonOutline onClick={(e) => removeStory(story)} ripple color="primary" type="button">Dismiss</StyledButtonOutline>
      </div>
    </StyledStory>
  );
};

export default StoryList;
