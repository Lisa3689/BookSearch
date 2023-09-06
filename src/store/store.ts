import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosResponse } from "axios";
import { BookType } from "../types/Book";

type BooksResponse = {
    totalItems: number,
    items: BookType[]
}

class Store {
    searchValue = '';
    filterValue = '';
    sortValue = 'relevance';
    books: BookType[] = [];
    totalCount: number = 0;
    isLoading = false;
    startIndex = 0;

    onChangeSearchValue = (value: string) => {
        this.searchValue = value;
    }

    onChangeFilterValue = (value: string) => {
        this.filterValue = value;
    }

    onChangeSortValue = (value: string) => {
        this.sortValue = value;
    }

    findBooks = async () => {
        this.startIndex = 0;
        this.isLoading = true;
        try {
            const queryParams = {
                key: process.env.REACT_APP_API_KEY,
                q: `${this.searchValue}+subject:${this.filterValue}`,
                startIndex: this.startIndex,
                maxResults: 30,
                orderBy: this.sortValue
            }
            const response: AxiosResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', { params: queryParams });
            const data: BooksResponse = response.data;

            runInAction(() => {
                this.books = data.items;
                this.totalCount = data.totalItems;
            })
        } catch (e) {

        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    getMoreBooks = async () => {
        this.startIndex += 30;
        try {
            const queryParams = {
                key: process.env.REACT_APP_API_KEY,
                q: `${this.searchValue}+subject:${this.filterValue}`,
                startIndex: this.startIndex,
                maxResults: 30,
                orderBy: this.sortValue
            }
            const response: AxiosResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', { params: queryParams });
            const data: BooksResponse = response.data;

            runInAction(() => {
                this.books = [...this.books, ...data.items];
            })
        } catch (e) {

        } finally {

        }
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new Store();