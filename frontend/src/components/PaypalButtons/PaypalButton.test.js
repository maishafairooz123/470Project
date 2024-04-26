import {  render,screen } from "@testing-library/react";
import PaypalButtons from "./PaypalButtons";




test("PaypalButtons is working",() => {
render(<PaypalButtons/>);


const LikeElement= screen.getByText (/learn react /);


expect(LikeElement).toBeChecked();




});
