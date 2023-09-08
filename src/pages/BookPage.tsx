import React, { useState, useEffect } from 'react';
import Books from "../components/Books";
import { Link, useParams } from "react-router-dom";
import s from './bookPage.module.scss';
import img from '../assets/img/book.svg';
import { BookType } from "../types/Book";
import axios, { AxiosResponse } from 'axios';
import parse from 'html-react-parser';

type BookCardProps = {
    book: BookType
}

const BookPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState<BookType | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response: AxiosResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`)
                setBook(response.data)
            } catch (e) {

            } finally {
                setIsLoading(false)
            }
        }

        fetchBook();
    }, [])

    if (isLoading) {
        <h1>LOADING...</h1>
    }

    return (

        <div className={s.bookPage}>

            <div>
                <img src={book?.volumeInfo.imageLinks?.thumbnail} alt="" />
            </div>

            <div className={s.description}>
                <div className={s.bookCaregory}>{book?.volumeInfo?.categories?.length ? book.volumeInfo.categories[0] : 'category is not set'}</div>
                <div className={s.bookName}>{book?.volumeInfo.title}</div>
                <div className={s.bookAuthor}>{book?.volumeInfo.authors?.length ? book?.volumeInfo?.authors.join(', ') : 'authors are not set'}</div>
                <div className={s.bookDescription}>{book?.volumeInfo.description ? parse(book.volumeInfo.description) : '-'}</div>
            </div>
        </div>
    );
};

export default BookPage;