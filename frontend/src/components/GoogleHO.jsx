import React, { useState, useEffect, useRef } from 'react';


const withGoogleScript = (WrappedComponent) => {
  return (props) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      const loadGoogleMapsScript = () => {
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?AIzaSyAlzTfObq8drpzkji75QRt9ATiY9KFtICQ&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => setIsScriptLoaded(true);
          document.head.appendChild(script);
        } else {
          setIsScriptLoaded(true);
        }
      };

      loadGoogleMapsScript();
    }, []);

    return isScriptLoaded ? <WrappedComponent {...props} /> : <div>Loading...</div>;
  };
};

export default withGoogleScript;
