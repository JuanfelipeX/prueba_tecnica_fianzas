import React, { useState, useEffect } from 'react';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [valor, setValor] = useState('');
  const [stock, setStock] = useState('');
  const [productoActualizado, setProductoActualizado] = useState(null);

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

  const handleEditarProducto = (producto) => {
    setProductoActualizado(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setValor(producto.valor);
    setStock(producto.stock);
  };

  const handleActualizarProducto = (producto) => {
    const productoActualizado = {
      nombre,
      precio,
      valor,
      stock
    };

    fetch(`http://localhost:3000/producto/${producto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productoActualizado)
    })
    .then(response => response.json())
    .then(data => {
      // Actualizar el producto en la lista
      const productosActualizados = productos.map(p => (p.id === data.id ? data : p));
      setProductos(productosActualizados);

      // Limpiar el estado de productoActualizado y los campos de entrada
      setProductoActualizado(null);
      setNombre('');
      setPrecio('');
      setValor('');
      setStock('');
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleBorrarProducto = (producto) => {
    fetch(`http://localhost:3000/producto/${producto.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Eliminar el producto de la lista
      const productosActualizados = productos.filter(p => p.id !== producto.id);
      setProductos(productosActualizados);
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  const handleCancelarEdicion = () => {
    setProductoActualizado(null);
    setNombre('');
    setPrecio('');
    setValor('');
    setStock('');
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
            {productoActualizado && productoActualizado.id === producto.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Nuevo Nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Nuevo Precio"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Nuevo Valor"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Nuevo Stock"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
                <button onClick={() => handleActualizarProducto(producto)}>Guardar</button>
                <button onClick={handleCancelarEdicion}>Cancelar</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEditarProducto(producto)}>Editar</button>
                <button onClick={() => handleBorrarProducto(producto)}>Borrar</button>
              </div>
            )}
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
