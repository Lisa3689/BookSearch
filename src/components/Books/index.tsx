import React from 'react';
import Store from "../../store/store";
import BookCard from "./BookCard";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import s from './books.module.scss'

const Books = () => {
    const { books, isLoading, totalCount, getMoreBooks } = Store;


    if (isLoading) {
        return <h1>LOADING...</h1>
    }
    return (
        <div className='container' >
            <div className={s.total}>{`Found ${totalCount} results`}</div>
            <div className={s.book}>
                {books.map(item => {
                    return (
                        <Link key={item.id} to={`/books/${item.id}`}>
                            <BookCard book={item} />
                        </Link>
                    )
                })}
            </div>
            {!!books.length && <button className={s.loadMore} onClick={getMoreBooks}>Load more</button>}
        </div>
    );
};

export default observer(Books);