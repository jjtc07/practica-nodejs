const socket = io();

socket.on('new image', data => {
  const imagesContainer = document.getElementById('content-images');
  console.log('data llegando al cliente: ', data)

  const imagen = JSON.parse(data);
  console.log('parse imagen: ', imagen);

  // aplicando el template
  const source = document.getElementById('image-template').innerHTML;
  const template = Handlebars.compile(source);

  // agregando nueva imagen al final
  // imagesContainer.innerHTML += template(imagen)

  // agregando nueva imagen al inicio
  imagesContainer.innerHTML = template(imagen) + imagesContainer.innerHTML
})