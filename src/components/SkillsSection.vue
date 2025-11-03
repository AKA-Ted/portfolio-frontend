<script setup lang="ts">
import { ref } from 'vue';

// En una aplicación real, estos datos vendrían de tu API.
// La interface Skill podría estar en tu archivo de interfaces.
interface Skill {
  name: string;
  icon: string; // Usaremos SVG como strings para los iconos
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories = ref<SkillCategory[]>([
  {
    title: 'Lenguajes',
    skills: [
      { name: 'TypeScript', icon: '<svg ...>...</svg>' }, // Reemplazar con SVG real
      { name: 'JavaScript', icon: '<svg ...>...</svg>' },
      { name: 'Python', icon: '<svg ...>...</svg>' },
      { name: 'Go', icon: '<svg ...>...</svg>' },
    ]
  },
  {
    title: 'Frameworks & Librerías',
    skills: [
      { name: 'Node.js', icon: '<svg ...>...</svg>' },
      { name: 'Vue.js', icon: '<svg ...>...</svg>' },
      { name: 'FastAPI', icon: '<svg ...>...</svg>' },
      { name: 'Django', icon: '<svg ...>...</svg>' },
      { name: 'Tailwind CSS', icon: '<svg ...>...</svg>' },
    ]
  },
  {
    title: 'Bases de Datos & Caché',
    skills: [
      { name: 'PostgreSQL', icon: '<svg ...>...</svg>' },
      { name: 'MongoDB', icon: '<svg ...>...</svg>' },
      { name: 'Redis', icon: '<svg ...>...</svg>' },
    ]
  },
  {
    title: 'Herramientas & DevOps',
    skills: [
      { name: 'Docker', icon: '<svg ...>...</svg>' },
      { name: 'Git', icon: '<svg ...>...</svg>' },
      { name: 'Nginx', icon: '<svg ...>...</svg>' },
      { name: 'Linux', icon: '<svg ...>...</svg>' },
    ]
  }
]);

// NOTA: Para los iconos, busca en sitios como "https://simpleicons.org/"
// y copia el contenido SVG directamente en la propiedad 'icon'.
// Por ejemplo, para TypeScript:
skillCategories.value[0].skills[0].icon = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TypeScript</title><path d="M1.5 0 h21 l-1.91 21.563 L11.977 24 l-8.564-2.438 L1.5 0 Z m7.031 9.75 l4.453 0 l-1.406 3.938 l-1.594 0.438 l-1.563-0.438 l-0.281-0.875 l-2.844 0 l0.469 2.125 l4.781 1.344 l4.75-1.344 l0.688-3.531 l-7.406-0.031 l0.219-0.625 l7.188 0 l0.313-1.531 l-9.469 0 l0.219-0.625 l11.031 0 l0.469-2.313 l-13.313 0 Z"/></svg>`;
</script>

<template>
  <section class="py-20">
    <h2 class="text-3xl font-bold mb-12 text-center text-white">
      Habilidades & Tecnologías
    </h2>
    
    <div class="space-y-10">
      <div v-for="category in skillCategories" :key="category.title">
        <h3 class="text-xl font-semibold text-sky-400 mb-4">{{ category.title }}</h3>
        <div class="flex flex-wrap gap-4">
          <div 
            v-for="skill in category.skills" 
            :key="skill.name"
            class="bg-gray-800 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div class="w-6 h-6 text-gray-300" v-html="skill.icon"></div>
            <span class="text-white font-medium">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
