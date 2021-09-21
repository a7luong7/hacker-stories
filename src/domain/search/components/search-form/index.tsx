import React, { useRef, useImperativeHandle, forwardRef, Ref } from 'react';
import InputWithLabel from 'components/input-with-label';
import { IconWithLoad, Icon } from 'components/icons';
import * as StyledButton from 'components/button/styles';
import * as StyledForm from './styles';

interface StorySearchFormProps {
  isLoading: boolean,
  appendToSearchedTerms: (searchTerm:string) => void
}
interface StorySearchFormRef {
  setInput: (input:string) => void
}
const StorySearchForm = forwardRef((props:StorySearchFormProps,ref:Ref<StorySearchFormRef>) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.appendToSearchedTerms(searchTerm);
  };

  useImperativeHandle(ref, () => { 
    return {
      setInput:input => setSearchTerm(input)
    }
  })

  return (
    <StyledForm.Form onSubmit={handleSubmit}>
      <StyledButton.Icon
        type="submit"
        disabled={!searchTerm || props.isLoading}
      >
        <IconWithLoad isLoading={props.isLoading} icon="search" size="lg" color="#ccc" />
      </StyledButton.Icon>
      <InputWithLabel
        id="story-search-input"
        value={searchTerm}
        placeholder="Search Hacker News..."
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
    </StyledForm.Form>
  );
});

export default StorySearchForm;
