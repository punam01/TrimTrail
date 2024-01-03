import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Cropper = () => {
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ unit: 'px', width: 50, height: 50 });
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            selectFile(URL.createObjectURL(file));
            setImage(null);
            setCrop({ unit: 'px', width: 50, height: 50 });
        }
    };

    const handleImageLoaded = (image) => {
        setImage(image);
    };

    const handleCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const handleCropComplete = (crop, pixelCrop) => {
        // You can perform additional actions when the user completes the crop here
        console.log(crop, pixelCrop);
    };

    const getCroppedImg = () => {
        if (image && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL('image/jpeg');
            setResult(base64Image);
        }
    };

    return (
        <>
            <main className="container">
                <section className="row">
                    <div className="col-6">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    {src && (
                        <div className="col-6">
                            <ReactCrop
                                src={src}
                                onImageLoaded={handleImageLoaded}
                                crop={crop}
                                onChange={handleCropChange}
                                onComplete={handleCropComplete}
                            />
                            <button className="btn btn-primary" onClick={getCroppedImg}>
                                Crop
                            </button>
                        </div>
                    )}
                    {result && (
                        <div className="col-6">
                            <img src={result} alt="cropped" className="img-fluid" />
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Cropper;
