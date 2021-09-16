import { render, fireEvent } from '@testing-library/react';
import { Button } from '.'

describe('Button tests', ()=>{
    
    const labelText = "Button text";
    
    it('Button renders children', () => {
        const component = render(<Button>{labelText}</Button>)
        expect(component.container).toHaveTextContent(labelText);
    })
    
    it('onclick event is fired', () => {
        const handleClick = jest.fn();
        const component = render(<Button onClick={handleClick}>{labelText}</Button>)
        fireEvent.click(component.getByText(labelText));
        expect(handleClick.mock.calls).toHaveLength(1)
        fireEvent.click(component.getByText(labelText));
        expect(handleClick.mock.calls).toHaveLength(2)
    })
})

