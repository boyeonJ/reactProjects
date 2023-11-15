const Title = ({title, sub}) => {
    return (
        <div className='section-title'>
            <h2>
                {title} <span>{sub}</span>
            </h2>
        </div>
    );
}

export default Title;