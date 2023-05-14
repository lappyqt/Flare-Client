export const getColumns = (list: Array<any>, count: number) => {
    return [...Array(count).keys()].map(x => list.filter((_, i) => i % count === x));
}