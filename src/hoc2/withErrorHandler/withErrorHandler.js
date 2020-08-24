import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux2 from '../Aux2/Aux2'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [ error, errorConfirmedHandler ] = useHttpErrorHandler(axios);

        return (
            <Aux2>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux2>
        );
        
    };
}

export default withErrorHandler;