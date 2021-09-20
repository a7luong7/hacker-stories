const testStories = require('../../src/tests/stories/test-stories')

describe('Search stories', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('front page can be opened', function () {
    cy.get('#story-search-input');
  })

  describe('search with dummy term "auth0"', ()=>{

    beforeEach(()=>{
      cy.get('#story-search-input').type('auth0');
      cy.get('button[type="submit"]').click();
    })

    it('search returns stories', function () {
      testStories.forEach(story => {
        cy.contains(story.title)
        cy.contains(story.author)
        cy.contains(story.num_comments)
        cy.contains(story.points)
      })
    })
  
    it('story can be dimissed', function () {
      const firstStory = testStories[0];
      cy.contains(firstStory.title)
      cy.contains(firstStory.title).parent().parent().contains('Dismiss').click();
      cy.contains(firstStory.title).should('not.exist')
    })
  })

  


})