const socket = io();
socket.on('realtimeProductRemoval', removedProductId => {
  removeProductFromList(removedProductId);
});
async function fetchAndRenderProductList() {
  try {
    const productList = await fetch('/api/products');
    const products = await productList.json();
    renderProductList(products);
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
  }
}

async function addProduct(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const thumbnail = document.getElementById('thumbnail').value;
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;

  if (!title || !description || !price || !category || !thumbnail || !code || !stock) {
    console.error('Todos los campos son obligatorios.');
    return;
  }

  const newProduct = {
    title,
    description,
    price: parseFloat(price),
    category,
    thumbnail,
    code,
    stock: parseInt(stock),
    status: true
  };

  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red fue invalidada');
    }

    const addedProduct = await response.json();
    console.log('Producto agregado:', addedProduct);
    socket.emit('realtimeProductUpdate', addedProduct);
    fetchAndRenderProductList();
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
}


function renderProductList(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.id = `product_${product._id}`;
    listItem.innerHTML = `
      <div class="product-details">
        <div>${product.title}</div>
        <div>Precio: ${product.price}</div>
        <div>Stock: ${product.stock}</div>
        <button type="button" onclick="deleteProduct('${product._id}')">Borrar</button>
      </div>`;
    productList.appendChild(listItem);
  });
}


async function deleteProduct(productId) {
  fetch(`/api/products/${productId}`, {
      method: 'DELETE',
  })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Producto borrado');
          } else {
              console.error('fallo al borrar el producto');
          }
      })
      .catch(error => {
          console.error('Error al borrar el producto, error:', error);
      });
}

socket.on('connect_error', error => {
  console.error('Socket.IO connection error:', error);
});



socket.on('disconnect', reason => {
  console.log('Socket.IO disconnected:', reason);
});



fetchAndRenderProductList();
