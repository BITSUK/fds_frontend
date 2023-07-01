import { render,screen } from '@testing-library/react';
import Footer from '../Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom';

    test('render Footer',()=>{
        render(
            <Router>
                <Footer />
            </Router>
        );
        const linkElement = screen.getByTestId('footer-1');
        expect(linkElement).toBeInTheDocument();
       
    });
