import {Spinner} from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner 
            animation='border'
            role='status'
            variant='primary'
            style={{
                height: '100px',
                width: '100px',
                margin: 'auto',
                display: 'block'
            }}
        >
            <span className='sr-only'>Loading..</span>
        </Spinner>
    )
}

export default Loader;