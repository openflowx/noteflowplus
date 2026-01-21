// hooks/use-is-large-screen.ts
import { useState, useEffect } from 'react';

export const useIsLargeScreen = (breakpoint = 1024) => {
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsLarge(window.innerWidth >= breakpoint);

        // Initial check
        checkScreen();

        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, [breakpoint]);

    return isLarge;
}