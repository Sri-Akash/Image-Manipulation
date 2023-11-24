const mainImage = document.getElementById('main_image');
document.addEventListener('DOMContentLoaded', function () {
    const cropImage = document.getElementById('cropImage');
    const mainMasked = document.getElementById('mainMasked');
    const maskedImage = document.getElementById('maskedImage');
    mainImage.style.display = 'none';
    var image = document.getElementById('previewImage');
    var cropper;
    var imageName;

    document.getElementById('inputImage').addEventListener('change', function (e) {
        showPopup();
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
            cropper = new Cropper(image, {
                viewMode: 1,
            });
        };

        reader.readAsDataURL(file);
    });

    window.crop = function () {
        var croppedData = cropper.getCroppedCanvas().toDataURL();
        image.src = croppedData;
        alert('Image Cropped Successfully')
    };

    window.rotate = function () {
        cropper.rotate(90);
        var rotatedData = cropper.getCroppedCanvas().toDataURL();
        image.src = rotatedData;
    };

    window.flipHorizontal = function () {
        cropper.scaleX(-cropper.getData().scaleX);
        var flippedData = cropper.getCroppedCanvas().toDataURL();
        image.src = flippedData;
    };

    window.flipVertical = function () {
        cropper.scaleY(-cropper.getData().scaleY);
        var flippedData = cropper.getCroppedCanvas().toDataURL();
        image.src = flippedData;
    };

    window.defineShape = function () {
        const previewImage = document.getElementById('previewImage');
        cropImage.src = previewImage.src;
        showCropPopup();
    }

    window.previewMainImage = function () {
        mainImage.style.display = 'block';
        mainImage.src = cropImage.src;
        const currentShape = maskedImage.dataset.currentShape;
        previewMask(currentShape);
        closeCropPopup();
        closePopup();
    }

    window.changeMask = function (shape) {
        maskedImage.classList.remove('rectangle', 'square', 'circle', 'heart');
        maskedImage.classList.add(shape);
        maskedImage.dataset.currentShape = shape;
    };

    window.original = function () {
        maskedImage.classList.remove('rectangle', 'square', 'circle', 'heart');
    }
    
});

function previewMask(shape) {
    mainImage.classList.remove('rectangle', 'square', 'circle', 'heart');
    mainImage.classList.add(shape);
}

function showPopup() {
    document.getElementById('popup-container').style.display = 'flex';
}

function showCropPopup() {
    document.getElementById('cropPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}

function closeCropPopup() {
    document.getElementById('cropPopup').style.display = 'none';
}