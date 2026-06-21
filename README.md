# 🎨 Portafolio Personal - Adrián Escribano

Un portafolio profesional moderno y minimalista diseñado al estilo Apple, construido con **Next.js**, **React**, **TypeScript**, **Tailwind CSS** y **HeroUI 3.1.0**.

**[Ver en línea →](https://porfolio.adrianescribano.com)**

## ✨ Características

- 🎯 **Diseño Minimalista**: Estilo Apple con espacios en blanco y tipografía clara
- 🌓 **Tema Claro/Oscuro**: Toggle entre temas con persistencia
- 📱 **Completamente Responsivo**: Mobile-first design
- ⚡ **Rendimiento**: Optimizado para velocidad y SEO
- 🎬 **Animaciones Suaves**: Transiciones elegantes
- 🔧 **Componentes Reutilizables**: Código limpio y mantenible
- 📝 **TypeScript**: Type-safe development
- 🎨 **HeroUI 3.1.0**: Componentes UI profesionales

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.2.6 | Framework React |
| React | 19.2.6 | UI Library |
| TypeScript | 5.6.3 | Type Safety |
| Tailwind CSS | 4.1.11 | Utility-first CSS |
| HeroUI | 3.1.0 | Componentes UI |
| next-themes | 0.4.6 | Dark Mode |

## 📂 Estructura del Proyecto

```
Porfolio/
├── components/          # Componentes reutilizables
│   ├── hero.tsx        # Sección principal
│   ├── skills.tsx      # Habilidades
│   ├── projects.tsx    # Proyectos destacados
│   ├── testimonials.tsx # Testimonios
│   └── ...
├── pages/              # Páginas del sitio
│   ├── index.tsx       # Home
│   ├── about/          # Sobre mí
│   ├── blog/           # Blog
│   └── contact/        # Contacto
├── layouts/            # Layouts
├── styles/             # Estilos globales
├── config/             # Configuración
└── public/             # Assets estáticos
```

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm, yarn, pnpm o bun

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/adrian-9559/Porfolio.git
cd Porfolio
```

2. **Instalar dependencias**
```bash
npm install
# O con pnpm
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Build producción**
```bash
npm run build
npm run start
```

## 📖 Páginas

### Home `/`
- Hero section con CTA
- Estadísticas y métricas
- Habilidades por categoría
- Tech stack visual
- Proyectos destacados
- Testimoniales
- Call to action

### About `/about`
- Historia personal
- Metodología de trabajo
- Timeline de carrera
- Estadísticas destacadas

### CV `/pricing`
- Experiencia profesional
- Educación
- Descarga de CV
- Logros

### Blog `/blog`
- Posts destacados
- Grid de artículos
- Metadatos (fecha, categoría)

### Contacto `/contact`
- Formulario de contacto
- Métodos de contacto directo
- Links a redes sociales

## 🎨 Personalización

### Cambiar Colores
Edita los gradientes en los componentes:
```tsx
from-blue-600 to-cyan-600  // Cambiar a tus colores
```

### Actualizar Contenido
1. **Hero**: `components/hero.tsx`
2. **Skills**: `components/skills.tsx`
3. **Projects**: `components/projects.tsx`
4. **About**: `pages/about/index.tsx`
5. **Contact**: `components/contact.tsx`

### Agregar Nuevas Páginas
1. Crea: `pages/nombre/index.tsx`
2. Importa: `DefaultLayout`
3. Actualiza: `config/site.ts`

## 📚 Documentación

- [Guía Completa](./PORTFOLIO_GUIDE.md)
- [Next.js Docs](https://nextjs.org/docs)
- [HeroUI Docs](https://heroui.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🔍 Scripts Disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar linter
```

## ✅ Checklist de Características

- ✅ Diseño estilo Apple
- ✅ Tema claro/oscuro
- ✅ Responsivo
- ✅ Animaciones
- ✅ TypeScript
- ✅ SEO optimizado
- ✅ Formulario de contacto
- ✅ Blog integrado
- ✅ Tech stack visual
- ✅ Testimonials

## 🔐 Licencia

Este proyecto está bajo la licencia MIT.

## 👤 Autor

**Adrián Escribano Pérez**
- 💼 [LinkedIn](https://www.linkedin.com/in/adrián-escribano-pérez)
- 🐙 [GitHub](https://github.com/adrian-9559)
- 📧 [Email](mailto:adrian.escribano.perez@gmail.com)
- 📍 Madrid, España

---

**Construido con ❤️ usando Next.js y Tailwind CSS**

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-pages-template/blob/main/LICENSE).
