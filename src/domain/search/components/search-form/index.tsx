import React from 'react';
import InputWithLabel from 'components/input-with-label';
import { IconWithLoad, Icon } from 'components/icons';
import * as StyledButton from 'components/button/styles';
import * as StyledForm from './styles';

const StorySearchForm = ({ 
  isLoading, 
  appendToSearchedTerms
}:{
  isLoading: boolean,
  appendToSearchedTerms: (searchTerm:string) => void
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    appendToSearchedTerms(searchTerm);
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
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
    </StyledForm.Form>
  );
};

export default StorySearchForm;
