import React, { useState, useEffect } from 'react';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [valor, setValor] = useState('');
  const [stock, setStock] = useState('');
  const [editandoProducto, setEditandoProducto] = useState(null);

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
    setEditandoProducto(producto);
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
      const productosActualizados = productos.map(p => (p.id === data.id ? data : p));
      setProductos(productosActualizados);
      setEditandoProducto(null);
      setNombre('');
      setPrecio('');
      setValor('');
      setStock('');
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleCancelarEdicion = () => {
    setEditandoProducto(null);
    setNombre('');
    setPrecio('');
    setValor('');
    setStock('');
  };

  const handleBorrarProducto = (producto) => {
    fetch(`http://localhost:3000/producto/${producto.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const productosActualizados = productos.filter(p => p.id !== producto.id);
      setProductos(productosActualizados);
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Productos</h1>
      <ul className="list-group">
        {productos.map(producto => (
          <li key={producto.id} className="list-group-item">
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Valor:</strong> ${producto.valor}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            {editandoProducto && editandoProducto.id === producto.id ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Nuevo Nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Nuevo Precio"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Nuevo Valor"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Nuevo Stock"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
                <button className="btn btn-success mr-2" onClick={() => handleActualizarProducto(producto)}>Guardar</button>
                <button className="btn btn-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary mr-2" onClick={() => handleEditarProducto(producto)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleBorrarProducto(producto)}>Borrar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2 className="mt-4">Crear Nuevo Producto</h2>
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleCrearProducto}>Crear Producto</button>
      </div>
    </div>
  );
}

export default ListaProductos;
