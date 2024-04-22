export default interface DataParser<T> {
    parse(data: any): T[];
}