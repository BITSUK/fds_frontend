import {render,screen,cleaup} from '@testing-library/react'
import Test from '../Test'

test('test',()=>{
 expect(true).toBe(true);
})

test('test should render',()=>{
    render(<Test/>);
    const testElement = screen.getByTestId('testcase-1');
    expect(testElement).toBeInTheDocument();
    expect(testElement).toHaveTextContent('Hello testcase!')
   })

