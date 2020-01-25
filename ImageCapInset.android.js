import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    PixelRatio,
    requireNativeComponent,
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const pxToDP = (n = 0) => PixelRatio.roundToNearestPixel(n / (PixelRatio.get()));

class ImageCapInset extends React.Component {
    render() {
        const {children, source, capInsets, capStyle = {}, ...rest} = this.props;
        const { top = 0, left = 0, right = 0, bottom = 0, ...restCapStyle } = capStyle;
        const FinCapStyle = {
            opacity: rest.style && rest.style.opacity ? rest.style.opacity: 1,
            top: pxToDP(top),
            bottom: pxToDP(bottom),
            right: pxToDP(right),
            left: pxToDP(left),
        };

        const normalizedSource = resolveAssetSource(source);
        // noinspection JSUnresolvedVariable
        return (
            <View {...rest}>
                <RCTImageCapInset
                    capInsets={capInsets}
                    resizeMode={'stretch'}
                    source={normalizedSource}
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    },
                    FinCapStyle,
                    restCapStyle,
                    ]} />
                {children}
            </View>
        );
    }
}

ImageCapInset.propTypes = {
    ...View.propTypes,
    source: Image.propTypes.source,
    capInsets: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
};

ImageCapInset.defaultProps = {
    ...View.defaultProps,
    capInsets: {top: 0, left: 0, right: 0, bottom: 0},
};

const RCTImageCapInset = requireNativeComponent('RCTImageCapInset', {
    propTypes: ImageCapInset.propTypes,
});

// noinspection JSUnusedGlobalSymbols
export default ImageCapInset;
