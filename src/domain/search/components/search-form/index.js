import React from 'react';
import InputWithLabel from 'components/input-with-label';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const StyledForm = styled.form`
  display:flex;
  border:solid #fff 1px;
  padding-top:.5rem;
  padding-bottom: .5rem;
  border-radius: .5rem;
  font-size:1.25em
`;
const StyledIconButton = styled.button`
  border:none;
  background:none !important;
  &:not([disabled]) {
    cursor: pointer;
  }
`;

const FontAwesomeIconWithLoad = ({ isLoading, icon, ...props }) => {
  if (isLoading) { return (<FontAwesomeIcon icon={faSpinner} {...props} pulse spin />); }
  return (<FontAwesomeIcon icon={faSearch} {...props} />);
};

const StorySearchForm = ({ isLoading, appendToSearchedTerms }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    appendToSearchedTerms(searchTerm);
    // setSearchTerm('');
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledIconButton
        type="submit"
        disabled={!searchTerm || isLoading}
      >
        <FontAwesomeIconWithLoad isLoading={isLoading} icon={faSearch} size="lg" color="#ccc" />
      </StyledIconButton>
      <InputWithLabel
        id="story-search-input"
        value={searchTerm}
        placeholder="Search Hacker News..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </StyledForm>
  );
};

export default StorySearchForm;
