import { render } from "@testing-library/react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '.'

library.add(faSearch);

describe('icon tests', ()=>{
    it('icon renders', () => {    
        const component = render(<Icon icon="search" />)
        const icon = component.container.querySelector('.fa-search') //Font awesome classes have this naming scheme
        expect(icon).not.toBeFalsy();
    })
    
    it('icon passes sizing', () => {
        let component = render(<Icon icon="search" size="lg" />)
        let icon = component.container.querySelector('.fa-search') //Font awesome classes have this naming scheme
        expect(icon).toHaveClass('fa-lg')
    
        component = render(<Icon icon="search" size="sm" />)
        icon = component.container.querySelector('.fa-search') //Font awesome classes have this naming scheme
        expect(icon).toHaveClass('fa-sm')
    })    
})

