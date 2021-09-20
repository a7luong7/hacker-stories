import { render, fireEvent } from "@testing-library/react";
import StorySearch from "domain/search";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


library.add(faSearch);

it('dummy render', () => {
    const component = render(<StorySearch />)
    expect(component).not.toBeFalsy();
})

it('search term can be entered', ()=>{
    const component = render(<StorySearch />)
    const input = component.container.querySelector('#story-search-input');
    expect(input.value).toBe('')

    const newInputValue = { target: { value: "react" } }
    fireEvent.change(input, newInputValue);
    expect(input.value).toBe(newInputValue.target.value)
})

it('search button disabled when input empty', ()=>{
    const component = render(<StorySearch />)
    
    const button = component.container.querySelectorAll('button[type="submit"]')[0];
    expect(button).toHaveProperty('disabled', true);

    const input = component.container.querySelector('#story-search-input');
    const newInputValue = { target: { value: "react" } }
    fireEvent.change(input, newInputValue);
    expect(button).toHaveProperty('disabled', false);

    fireEvent.change(input, { target: { value: "" } });
    expect(button).toHaveProperty('disabled', true);
})