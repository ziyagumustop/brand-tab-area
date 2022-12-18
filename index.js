let counter = 0;

(function () {
    fetch('katalog.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then((response) => render(response));
})()

function getProduct(brandName) {
    document.querySelectorAll('.brands div').forEach((e) => e.classList.remove('selected'));
    document.getElementsByClassName(`brand_logo_${brandName}`)[0].classList.add('selected');

    document.querySelectorAll('.brand_wrapper').forEach(e => e.classList.remove('show'));
    document.querySelectorAll('.brand_wrapper').forEach(e => e.classList.add('hide'));

    document.getElementsByClassName(brandName)[0].classList.add('show');
    document.getElementsByClassName(brandName)[0].classList.remove('hide');

}

function closePopup(){
    document.querySelector('.sepet_popup').style.display = 'none';
}

function showPopup() {
    document.querySelector('.sepet_popup').style.display = 'flex';
    counter += 3000
    setTimeout(() => {
        console.log(counter)
        counter -= 3000
        if (counter < 3000)
            document.querySelector('.sepet_popup').style.display = 'none';
    }, 3000)
}

function getCurrency(price) {

    let currency_symbol = "₺";
    let formattedOutput = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
    });

    return formattedOutput.format(price).replace(currency_symbol, '') + ' TL';
}

function createProducts(element, product_wrapper) {
    element.products.forEach((el) => {
        let product = document.createElement('div');


        let product_image = document.createElement('img');
        product_image.setAttribute('loading', 'lazy');
        product_image.setAttribute('src', el.image);
        product_image.classList.add('product_image');
        product.appendChild(product_image);

        let product_info_area = document.createElement('div');
        product_info_area.classList.add('info_area');


        let product_name = document.createElement('p');
        product_name.innerHTML = el.name;
        product_name.classList.add('product_name');
        product_info_area.appendChild(product_name);

        let product_price = document.createElement('p');
        product_price.innerHTML = getCurrency(el.price);
        product_price.classList.add('price');
        product_info_area.appendChild(product_price);

        let button_wrapper = document.createElement('div');
        button_wrapper.classList.add('button_wrapper');
        let buy_button = document.createElement('button');
        buy_button.innerHTML = 'Sepete Ekle';
        buy_button.setAttribute('onclick', 'showPopup()');
        button_wrapper.appendChild(buy_button);
        product_info_area.appendChild(button_wrapper);
        product.appendChild(product_info_area);
        product_wrapper.appendChild(product);
    })
}

function createBrand(element, index) {
    let brand_logo = document.createElement('div');
    let image = document.createElement('img');
    let brand_logo_name = document.createElement('div');
    brand_logo_name.innerText = element.brandName;
    brand_logo.classList.add('brand_logo_' + element.brandName);

    brand_logo.setAttribute('onmouseover', `getProduct('${element.brandName}')`);
    image.setAttribute('src', element.brandLogo);

    brand_logo.appendChild(image);
    brand_logo.appendChild(brand_logo_name);

    document.querySelector('.brands').appendChild(brand_logo);
    if (index == 0)
        brand_logo.classList.add('selected');

}

function createBrandImage(element, index) {
    let brand_wrapper = document.createElement('div');
    brand_wrapper.classList.add(element.brandName);
    brand_wrapper.classList.add('brand_wrapper');

    brand_wrapper.classList.add('hide');
    if (index == 0) {
        brand_wrapper.classList.add('show');
    }

    let brand_image_wrapper = document.createElement('div');
    brand_image_wrapper.classList.add('brand_image_wrapper');
    let brand_image = document.createElement('img');
    brand_image.setAttribute('loading', 'lazy');
    brand_image.style.height = '100%';

    return {
        brand_image,
        brand_image_wrapper,
        brand_wrapper
    };
}

function render(data) {

    data.forEach((e, i) => {
        createBrand(e, i)
        let { brand_image, brand_image_wrapper, brand_wrapper } = createBrandImage(e, i);
        let product_wrapper = document.createElement('div');
        product_wrapper.classList.add('product-wrapper');

        brand_image.setAttribute('src', e.brandImage);
        brand_image_wrapper.appendChild(brand_image);
        brand_wrapper.appendChild(brand_image_wrapper);

        createProducts(e, product_wrapper);

        brand_wrapper.appendChild(product_wrapper);
        document.querySelector('.wrapper').appendChild(brand_wrapper);

    });
}   