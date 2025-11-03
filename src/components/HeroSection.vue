<script setup lang="ts">

</script>

<template>
  <div class="bg-gray-900 text-white">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div class="text-center">
        <h1 class="text-5xl md:text-7xl font-black uppercase">
          Tu Nombre
        </h1>
        <div class="typing-container mt-4">
          <h2 class="text-2xl md:text-4xl text-sky-400 font-medium typing-effect">
            Software Developer
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor para asegurar que el layout no se rompa durante la animación */
.typing-container {
  display: inline-block;
  vertical-align: top;
}

/* La animación de escritura */
.typing-effect {
  display: inline-block;
  overflow: hidden; /* Oculta el texto que aún no se ha "escrito" */
  white-space: nowrap; /* Mantiene el texto en una sola línea */
  border-right: .15em solid rgb(56 189 248); /* El cursor que parpadea */
  letter-spacing: .1em;
  width: 0; /* Inicia sin ancho, el texto está oculto */
  animation: 
    typing 3s steps(19, end) forwards, /* 19 es el número de caracteres en "Software Developer" */
    blink-caret .75s step-end infinite;
}

/* Animación del texto apareciendo */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Animación del cursor parpadeando */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: rgb(56 189 248); } /* Color sky-400 */
}
</style>
