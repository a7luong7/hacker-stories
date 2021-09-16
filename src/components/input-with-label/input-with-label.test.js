import { render, fireEvent } from "@testing-library/react";
import InputWithLabel from ".";

describe('input with label', () => {
    const id = "id";
    const labelText = "Input label";
    let testValue = "testValue";
    let component;

    beforeEach(()=>{
        testValue = "testValue";
        component = render(
            <InputWithLabel
                value={testValue}
                onChange={()=>{}}
                id={id} >
                {labelText}
            </InputWithLabel>
        )
    });

    it('component passes id to input', () => {
        const input = component.container.querySelector(`#${id}`);
        expect(input).not.toBeFalsy();
    });

    it('component renders label', () => {
        expect(component.container).toHaveTextContent(labelText);
    });
    
    it('component passes value', () => {
        const input = component.container.querySelector('input')
        expect(input.value).toBe(testValue);
    });

    it('component passes type', () => {
        let input = component.container.querySelector('input[type="text"]')
        expect(input).not.toBeFalsy();

        component = render(<InputWithLabel type="number" value={testValue} onChange={()=>{}} id={id} />)
        input = component.container.querySelector('input[type="number"]')
        expect(input).not.toBeFalsy();

        component = render(<InputWithLabel type="checkbox" value={testValue} onChange={()=>{}} id={id} />)
        input = component.container.querySelector('input[type="checkbox"]')
        expect(input).not.toBeFalsy();
    });

    it('component passes onchange', async () => {
        const handleChange = jest.fn(e => {
            console.log('mock func', e.target.value)
        });
        component = render(<InputWithLabel 
            onChange={handleChange} 
            value={testValue}  
            id={id} />)

        const input = component.container.querySelector('input')
        const event = { 
            target: { 
                value: 'new value' 
            } 
        };
        fireEvent.change(input, event);
        expect(handleChange.mock.calls).toHaveLength(1)
        fireEvent.change(input, event);
        expect(handleChange.mock.calls).toHaveLength(2)

        //TODO: Why does this pass the old value
        //expect(handleChange.mock.calls[0][0]).toMatchObject(event) 
    })
})

