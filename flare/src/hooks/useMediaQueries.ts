const useMediaQueries = (args: Array<{ query: string, callback: Function }>) => {

    const addListeners = (): void => {
        args.forEach((arg) => {
            const media = window.matchMedia(arg.query);
    
            media.addEventListener('change', () => {
                if (media.matches) {
                    arg.callback();
                }
            });
        });
    }

    const removeListeners = (): void => {
        args.forEach((arg) => {
            const media = window.matchMedia(arg.query);
            media.removeEventListener('change', () => arg.callback);
        });
    }

    return [ addListeners, removeListeners ];
}

export default useMediaQueries;