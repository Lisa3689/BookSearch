import React from 'react';
import { BookType } from "../../../types/Book";
import s from './index.module.scss'

type BookCardProps = {
    book: BookType
}

const BookCard = ({ book }: BookCardProps) => {
    return (
        <div className={s.book}>
            <div><img src={book.volumeInfo.imageLinks?.thumbnail} alt="" /></div>
            <div>Categorie: {book.volumeInfo.categories?.length ? book.volumeInfo.categories[0] : '-'}</div>
            <div className={s.bookName}>{book.volumeInfo.title}</div>
            <div>Authors: {book.volumeInfo.authors?.length ? book.volumeInfo.authors.join(', ') : '-'}</div>
        </div>
    );
};

export default BookCard;