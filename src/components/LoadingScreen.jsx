import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='spinner-overlay'>
            <div className="lds-spinner position-fixed"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;