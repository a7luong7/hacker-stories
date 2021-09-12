import React from 'react';
import InputWithLabel from 'components/input-with-label';
import { IconWithLoad } from 'components/icons';
import * as StyledButton from 'components/button/styles';
import * as StyledForm from './styles';

const StorySearchForm = ({ isLoading, appendToSearchedTerms }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    appendToSearchedTerms(searchTerm);
    // setSearchTerm('');
  };
  return (
    <StyledForm.Form onSubmit={handleSubmit}>
      <StyledButton.Icon
        type="submit"
        disabled={!searchTerm || isLoading}
      >
        <IconWithLoad isLoading={isLoading} icon="search" size="lg" color="#ccc" />
      </StyledButton.Icon>
      <InputWithLabel
        id="story-search-input"
        value={searchTerm}
        placeholder="Search Hacker News..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </StyledForm.Form>
  );
};

export default StorySearchForm;
