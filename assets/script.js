const productsList = document.querySelector('.products-list');
const btnToProducts = document.querySelector('.btn-to-products');
const baseUrl = 'http://localhost:3000';

async function getProducts() {
    const data = await fetch(`${baseUrl}/products`);
    const jsonData = await data.json();
    if (jsonData.status !== 'success') {
        return null;
    } else {
        return jsonData.response;
    }
}

async function btnToProductsClick(event) {
    const products = await getProducts();
    products.forEach(product => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        const price = parseFloat(product.price);
        newProduct.innerHTML = `
            <div class="product-img-ctn">
                <object class="product-img" data="${baseUrl}${product.image}" type="image/jpg">
                    <img src="${baseUrl}/static/img/image-not-found.webp" alt="${product.name} image" />
                </object>
                
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price"><span class="price">${price}€</span></div>
            </div>
            <div class="filler"></div>
            <a href="./product.html?id=${product.id}" class="product-btn">Description</a>
        `;
        productsList.appendChild(newProduct);
    })
    productsList.style.display = 'flex';
    const pos = productsList.offsetTop;
    window.scrollTo({ left: 0, top: pos, behavior: 'smooth'});
    btnToProducts.removeEventListener('click', btnToProductsClick);
    btnToProducts.addEventListener('click', () => window.scrollTo({ left: 0, top: pos, behavior: 'smooth'}));
}

btnToProducts.addEventListener('click', btnToProductsClick);