import React from 'react';
import Store from "../../store/store";
import BookCard from "./BookCard";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import s from './index2.module.scss'

const Books = () => {
    const { books, isLoading, totalCount, getMoreBooks } = Store;


    if (isLoading) {
        return <h1>LOADING...</h1>
    }
    return (
        <div className='container'>
            <div>{`Found ${totalCount} results`}</div>
            {books.map(item => {
                return (
                    <Link key={item.id} to={`/books/${item.id}`}>
                        <div className={s.book}>
                            <BookCard book={item} />
                        </div>
                    </Link>
                )
            })}
            {!!books.length && <button onClick={getMoreBooks}>Load more</button>}
        </div>
    );
};

export default observer(Books);