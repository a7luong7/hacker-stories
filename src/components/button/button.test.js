import { render, fireEvent } from '@testing-library/react';
import { Button } from '.'

describe('Button tests', ()=>{
    const labelText = "Button text";
    const handleClick = jest.fn();
    let component;

    beforeEach(()=>{
        component = render(<Button onClick={handleClick}>{labelText}</Button>)
    })
    
    it('Button renders children', () => {
        expect(component.container).toHaveTextContent(labelText);
    })
    
    it('onclick event is fired', () => {
        fireEvent.click(component.getByText(labelText));
        expect(handleClick.mock.calls).toHaveLength(1)
        fireEvent.click(component.getByText(labelText));
        expect(handleClick.mock.calls).toHaveLength(2)
    })
})

