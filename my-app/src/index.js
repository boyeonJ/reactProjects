import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';

const BookList = () => {
    return (
        <section className='booklist'>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
        </section>
    );
};
const Book = () => {
    return (
        <article className='book'>
            <Image />
            <Title />
            <Author />
        </article>
    );
};

const Image = () => {
    return <img src="https://images-na.ssl-images-amazon.com/images/I/91n7p-j5aqL._AC_UL900_SR900,600_.jpg" alt="Fourth Wing"/>
}
const Title = () => {
    return <h2>Fourth Wing</h2>
}
const Author = () => {
    return <h4>Rebecca Yarros</h4>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookList />);

