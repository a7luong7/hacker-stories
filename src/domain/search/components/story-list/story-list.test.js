import { render, fireEvent } from "@testing-library/react";
import StoryList from ".";

const testStories = [{
    objectId: '26334516',
    author: 'lpage',
    title: 'Okta to Acquire Auth0 for $6.5B',
    url: 'https://www.cnbc.com/2021/03/03/okta-is-buying-security-rival-auth0-for-6point5-billion-stock-falls.html',
    num_comments: 100,
    points: 632
},
{
    objectId: '26358309',
    author: 'advaitruia',
    title: 'The reason Okta spent $6.5B on Auth0',
    url: 'https://supertokens.io/blog/the-real-reason-okta-spent-on-auth0',
    num_comments: 148,
    points: 217
},
{
    objectId: '26880147',
    author: 'inssein',
    title: 'Auth0 Has been down for almost 4 hours now',
    url: null,
    num_comments: 101,
    points: 195
}]

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
