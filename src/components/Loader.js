import LoaderStyles from '../styles/LoaderStyles';

const Loader = () => {
    return (
        <LoaderStyles className='loading-icon'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </LoaderStyles>
    )
}

export default Loader;