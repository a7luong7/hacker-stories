import { render } from "@testing-library/react";
import Chip from ".";

it('chip renders children', ()=>{
    const labelText = "This is a chip";
    const component = render(<Chip>{labelText}</Chip>)
    expect(component.container).toHaveTextContent(labelText);
})