import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
// import { Button } from './Styles';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setVisible(true)
        }
        else if (scrolled <= 100) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button
            position='fixed'
            backgroundColor={'transparent'}
            _hover={{ backgroundColor: 'transparent' }}
            left={{ base: '40%', sm: '45%' }}
            bottom='40px'
            height='20px'
            fontSize={{ base: '1.3rem', md: '2rem' }}
            zIndex='1'
            cursor='pointer'
            color='tomato'
        >
            <FaArrowCircleUp onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} />
        </Button >
    );
}

export default ScrollButton;
