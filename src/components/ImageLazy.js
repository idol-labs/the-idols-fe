import React, { useState, useEffect } from 'react';

const placeHolder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkOPdfEgAEiwHoK70VxwAAAABJRU5ErkJggg==';

const ImageLazy = ({
    src,
    alt,
    className,
}) => {
    const [imageSrc, setImageSrc] = useState(placeHolder)
    const [imageRef, setImageRef] = useState()
  
    useEffect(() => {
        let observer;
        let didCancel = false
    
        if (imageRef && imageSrc === placeHolder) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            // when image is visible in the viewport + rootMargin
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 || entry.isIntersecting)
                            ) {
                                setImageSrc(src)
                            }
                        })
                    },
                    {
                        threshold: 0.01,
                        rootMargin: '75%',
                    }
                )
                observer.observe(imageRef)
            } else {
                // Old browsers fallback
                setImageSrc(src)
            }
        }
        
        return () => {
            didCancel = true
            // on component unmount, we remove the listner
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef)
            }
        }
    }, [imageRef, imageSrc, src])

    return (
        <picture className={className}>
            <img
                ref={setImageRef}  
                src={imageSrc} 
                alt={alt} 
            />
        </picture>
    );
};

export default ImageLazy;
