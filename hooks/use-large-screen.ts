// hooks/use-large-screen.ts
import { useState, useEffect } from 'react';

export const useIsLargeScreen = (breakpoint = 1024) => {
    const [isLarge, setIsLarge] = useState(() => {
        if (globalThis.window !== undefined) {
            return globalThis.window.innerWidth >= breakpoint;
        }
        return false;
    });

    useEffect(() => {
        const checkScreen = () => setIsLarge(globalThis.window.innerWidth >= breakpoint);

        // Successive check in case of mount timing
        checkScreen();

        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, [breakpoint]);

    return isLarge;
};