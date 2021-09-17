import { render, fireEvent } from "@testing-library/react";
import StorySearchForm from ".";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);
const testInput = { target: { value: 'New story test' } };

describe('story search form', ()=>{
    let component;
    let input;
    let button;

    beforeEach(() => {
        component = render(<StorySearchForm
            isLoading={false}
            appendToSearchedTerms={() => { }} />);

        input = component.container.querySelector('input[type="text"]');
        button = component.container.querySelector('button[type="submit"]');
    })

    it('search button disabled when loading', ()=>{
        component = render(<StorySearchForm isLoading={true} appendToSearchedTerms={()=>{}} />);
        input = component.container.querySelector('input[type="text"]');
        fireEvent.change(input, testInput);
    
        button = component.container.querySelector('button[type="submit"]');
        expect(button).toHaveProperty('disabled', true);
    });
    
    it('search button disabled when no text entered', ()=>{
        expect(button).toHaveProperty('disabled', true);
    })
    
    it('search button enabled when not loading and input has text', ()=>{
        fireEvent.change(input, testInput);
        expect(button).toHaveProperty('disabled', false);
    });

    it('append to search called on submit', ()=>{
        const appendToSearchedTerms = jest.fn();
        component = render(<StorySearchForm 
            isLoading={false}
            appendToSearchedTerms={appendToSearchedTerms}
        />);
        input = component.container.querySelector('input[type="text"]');
        fireEvent.change(input, testInput);
    
        button = component.container.querySelector('button[type="submit"]');
        fireEvent.click(button);
        
        expect(appendToSearchedTerms).toHaveBeenCalledTimes(1);
        expect(appendToSearchedTerms.mock.calls[0][0]).toEqual(testInput.target.value)
    })
})



