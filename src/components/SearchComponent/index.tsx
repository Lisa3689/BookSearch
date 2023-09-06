import React from 'react';
import s from './searchComponent.module.scss';
import Store from "../../store/store";
import { CategoryType } from "../../types/Category";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from 'react-router-dom';

const categories: CategoryType[] = [
    { id: '', name: 'all' },
    { id: 'art', name: 'art' },
    { id: 'biography', name: 'biography' },
    { id: 'computers', name: 'computers' },
    { id: 'history', name: 'history' },
    { id: 'medical', name: 'medical' },
    { id: 'poetry', name: 'poetry' },
]

const filters: CategoryType[] = [
    { id: 'relevance', name: 'relevance' },
    { id: 'newest', name: 'newest' }
]

const SearchComponent = () => {
    const {
        searchValue,
        sortValue,
        filterValue,
        onChangeSearchValue,
        onChangeSortValue,
        onChangeFilterValue,
        findBooks
    } = Store;

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onFindBooks = () => {
        if (pathname !== '/') {
            navigate('/');
        }

        findBooks();
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onFindBooks();
        }
    }

    return (
        <div className={s.header}>
            <h1 className='title'>Search for books</h1>
            <div className={s.searchTable}>
                <input type="text" placeholder='Type keyword' value={searchValue}
                    onChange={(e) => onChangeSearchValue(e.target.value)} onKeyDown={handleKeyPress} />
                <button onClick={onFindBooks}>Search</button>
            </div>
            <form>
                <div className={s.categories}>
                    <div>
                        <label htmlFor="categories-select">Categories: </label>
                        <select value={filterValue} name="categories" id="categories-select"
                            onChange={(e) => onChangeFilterValue(e.target.value)}>
                            {categories.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort-by">Sort by: </label>
                        <select value={sortValue} name="sort" id="sort-by"
                            onChange={(e) => onChangeSortValue(e.target.value)}>
                            {filters.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>

                </div>
            </form>

        </div>
    );
};

export default observer(SearchComponent);