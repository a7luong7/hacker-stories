import { render, fireEvent } from "@testing-library/react";
import StoryList from ".";
import testStories from 'components/../tests/stories/test-stories'

describe('story list tests', () => {
    it('0 stories renders expected result', ()=>{
        const emptyListText = "No stories found";
        const component = render(<StoryList 
            stories={[]}
            removeStory={()=>{}} />)
        expect(component.container).toHaveTextContent(emptyListText);
    })
    
    it('story list renders', () => {
        const component = render(<StoryList 
            stories={testStories}
            removeStory={()=>{}} />)
    
        testStories.forEach(story=>{
            expect(component.container).toHaveTextContent(story.title);
            expect(component.container).toHaveTextContent(story.author);
            expect(component.container).toHaveTextContent(story.points);
            expect(component.container).toHaveTextContent(story.num_comments);
        })
    });
    
    it('handle dismiss stories button', () => {
        const handleRemoveStory = jest.fn();
        const component = render(<StoryList 
            stories={testStories}
            removeStory={handleRemoveStory} />)
    
        const button = component.getAllByText("Dismiss")[0];
        fireEvent.click(button);
        expect(handleRemoveStory.mock.calls).toHaveLength(1);
        expect(handleRemoveStory.mock.calls[0][0]).toMatchObject(testStories[0]) 
    
    });
})

