// src/components/Login.js
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import FadeInOut from "./FadeInOut";
import { clearError } from '../actions';

const Error = ({ error, clearError }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(error ? true : false);
        setTimeout(() => {
            setVisible(false)
        }, 10000)

        setTimeout(() => {
            clearError();
        }, 15000)
    },[error])

  return (
    <FadeInOut show={visible} duration={1000}>
        <div class="text-white bg-error p-1">
            {error}
        </div>
    </FadeInOut>
  );
};

const mapStateToProps = (state) => ({
  error: state.throwaway.error
});

const mapDispatchToProps = {
    clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
