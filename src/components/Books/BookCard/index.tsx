import React from 'react';
import { BookType } from "../../../types/Book";
import s from './bookCard.module.scss'
import bookSvg from '../../../assets/img/book.svg';

type BookCardProps = {
    book: BookType
}

const BookCard = ({ book }: BookCardProps) => {
    return (
        <div className={s.book}>
            <div><img className={s.bookImg} src={book.volumeInfo.imageLinks?.thumbnail} alt="" /></div>
            <div className={s.bookCategorie}>Categorie: {book.volumeInfo.categories?.length ? book.volumeInfo.categories[0] : '-'}</div>
            <div className={s.bookName}>{book.volumeInfo.title}</div>
            <div className={s.bookAuthors}>Authors: {book.volumeInfo.authors?.length ? book.volumeInfo.authors.join(', ') : '-'}</div>
        </div>
    );
};

export default BookCard;