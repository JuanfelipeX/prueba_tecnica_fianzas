import React, { useState, useEffect } from 'react';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [valor, setValor] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/producto')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCrearProducto = () => {
    const nuevoProducto = {
      nombre,
      precio,
      valor,
      stock
    };

    fetch('http://localhost:3000/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.json())
    .then(data => {
      setProductos([...productos, data]);
      setNombre('');
      setPrecio('');
      setValor('');
      setStock('');
    })
    .catch(error => console.error('Error creating product:', error));
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <p>Nombre: {producto.nombre}</p>
            <p>Precio: {producto.precio}</p>
            <p>Valor: {producto.valor}</p>
            <p>Stock: {producto.stock}</p>
          </li>
        ))}
      </ul>
      <h2>Crear Nuevo Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />
      <button onClick={handleCrearProducto}>Crear Producto</button>
    </div>
  );
}

export default ListaProductos;
