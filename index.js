let counter = 0;

class ProductList {
    constructor(products) {
        this.products = products;
    }

    createProductElements() {
        return this.products.map(product => product.createProductElement());
    }
}

class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    createProductElement() {
        const product = this.createProductContainer();
        const productImage = this.createProductImage();
        const productInfoArea = this.createProductInfoArea();

        product.appendChild(productImage);
        product.appendChild(productInfoArea);

        return product;
    }

    createProductContainer() {
        const product = document.createElement('div');
        return product;
    }

    createProductImage() {
        const productImage = document.createElement('img');
        productImage.setAttribute('loading', 'lazy');
        productImage.setAttribute('src', this.image);
        productImage.classList.add('product_image');
        return productImage;
    }

    createProductInfoArea() {
        const productInfoArea = document.createElement('div');
        productInfoArea.classList.add('info_area');

        const productName = document.createElement('p');
        productName.innerHTML = this.name;
        productName.classList.add('product_name');
        productInfoArea.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.innerHTML = getCurrency(this.price);
        productPrice.classList.add('price');
        productInfoArea.appendChild(productPrice);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button_wrapper');
        const buyButton = document.createElement('button');
        buyButton.innerHTML = 'Sepete Ekle';
        buyButton.setAttribute('onclick', 'showPopup(document.querySelector(".sepet_popup"))');
        buttonWrapper.appendChild(buyButton);
        productInfoArea.appendChild(buttonWrapper);

        return productInfoArea;
    }
}


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



function showElement(brandName) {
    let first_brand_name = document.getElementsByClassName(brandName)[0]

    document.getElementsByClassName(`brand_logo_${brandName}`)[0].classList.add('selected');
    first_brand_name.classList.add('show');
    first_brand_name.classList.remove('hide');

}

function hideElement(brands_wrapper) {
    document.querySelectorAll('.brands div').forEach((e) => e.classList.remove('selected'));
    brands_wrapper.forEach(e => e.classList.remove('show'));
    brands_wrapper.forEach(e => e.classList.add('hide'));
}

function getProduct(brandName) {
    let brands_wrapper = document.querySelectorAll('.brand_wrapper')
    hideElement(brands_wrapper)
    showElement(brandName)


}

function closePopup(pop_up) {
    pop_up.style.display = 'none';
}

function showPopup(pop_up) {


    pop_up.style.display = 'flex';
    counter += 3000
    setTimeout(() => {
        console.log(counter)
        counter -= 3000
        if (counter < 3000)
            pop_up.style.display = 'none';
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

function createProducts(element, productWrapper) {
    const productList = new ProductList(element.products.map(product => new Product(product.name, product.price, product.image)));
    const productElements = productList.createProductElements();
    productElements.forEach(productElement => productWrapper.appendChild(productElement));
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