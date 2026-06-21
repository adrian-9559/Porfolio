# 🎨 Portafolio Estilo Apple - Guía Completa

## 📋 Descripción General

He transformado tu portafolio en un diseño moderno y minimalista al estilo Apple, utilizando **Tailwind CSS** y **HeroUI 3.1.0**. El nuevo portafolio es completamente responsivo, tiene tema claro/oscuro integrado, y presenta todas tus habilidades de forma elegante.

---

## 🏗️ Estructura del Proyecto

```
Porfolio/
├── components/
│   ├── hero.tsx              # Sección principal con CTA
│   ├── stats.tsx             # Métricas y logros
│   ├── skills.tsx            # Habilidades por categoría
│   ├── tech-stack.tsx        # Tecnologías con proficiencia
│   ├── projects.tsx          # Proyectos destacados
│   ├── testimonials.tsx      # Testimonios de clientes
│   ├── blog.tsx              # Artículos de blog
│   ├── resume.tsx            # Experiencia y educación
│   ├── contact.tsx           # Formulario y contacto
│   ├── cta.tsx               # Call to action final
│   ├── navbar.tsx            # Navegación mejorada
│   └── theme-switch.tsx      # Toggle tema claro/oscuro
├── layouts/
│   ├── default.tsx           # Layout principal
│   └── head.tsx              # Head configuration
├── pages/
│   ├── index.tsx             # Home (página principal)
│   ├── about/index.tsx       # Página Sobre mí
│   ├── blog/index.tsx        # Página Blog
│   ├── contact/index.tsx     # Página Contacto
│   ├── pricing/index.tsx     # Página CV/Experiencia
│   ├── _app.tsx              # App wrapper
│   └── _document.tsx         # Document wrapper
├── styles/
│   └── globals.css           # Estilos globales y animaciones
├── config/
│   └── site.ts               # Configuración del sitio
└── public/
    └── images/               # Imágenes del portafolio
```

---

## 🎯 Páginas y Componentes

### 1️⃣ **Home** (`/`)
**Componentes incluidos:**
- ✨ Hero Section con gradiente azul-cyan
- 📊 Stats - Métricas de experiencia y proyectos
- 🛠️ Skills - Habilidades por categoría
- 💻 Tech Stack - Tecnologías con indicador de proficiencia
- 🎨 Projects - Proyectos destacados
- 💬 Testimonials - Feedback de clientes
- 📞 CTA - Llamada a la acción final

### 2️⃣ **About** (`/about`)
- Historia personal completa
- Enfoque de trabajo y metodología
- Experiencia y proyectos completados
- Timeline de carrera profesional

### 3️⃣ **CV/Experiencia** (`/pricing`)
- Experiencia profesional detallada
- Educación y formación
- Descarga de CV en PDF
- Estadísticas agregadas

### 4️⃣ **Blog** (`/blog`)
- Featured post destacado
- Grid de artículos adicionales
- Metadatos (fecha, categoría, tiempo lectura)

### 5️⃣ **Contacto** (`/contact`)
- Formulario de contacto responsivo
- Métodos de contacto directo
- Links a redes sociales

---

## 🎨 Características de Diseño

### ✨ Estilo Apple
- **Tipografía clara**: Texto grande y legible
- **Espacios en blanco**: Abundantes espacios para respiración visual
- **Colores minimalistas**: Blanco, gris y tonos azul-cyan
- **Bordes redondeados**: Suaves y sutiles
- **Sombras sutiles**: No invasivas, apenas perceptibles

### 🌓 Tema Claro/Oscuro
- Toggle en navbar para cambiar entre temas
- Colores optimizados para ambos modos
- Persistencia del tema preferido

### 📱 Responsivo
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Componentes adaptables a cualquier tamaño

### 🎬 Animaciones
- Transiciones suaves en botones y links
- Efectos hover mejorados
- Animaciones CSS personalizadas (fadeIn, slideUp, float)

---

## 🚀 Cómo Usar

### Instalación
```bash
cd Porfolio
pnpm install  # o npm install
```

### Desarrollo
```bash
npm run dev
# O con pnpm
pnpm dev
```
Accede a `http://localhost:3000`

### Build Producción
```bash
npm run build
npm run start
```

---

## 📝 Personalización

### Cambiar Colores
Edita `globals.css` y busca las clases con gradientes:
```css
from-blue-600 to-cyan-600  /* Cambiar estos colores */
```

### Actualizar Contenido
1. **Hero**: Edita [hero.tsx](components/hero.tsx) - Texto y CTA
2. **Skills**: Edita [skills.tsx](components/skills.tsx) - Categorías y skills
3. **Projects**: Edita [projects.tsx](components/projects.tsx) - Proyectos
4. **Tech Stack**: Edita [tech-stack.tsx](components/tech-stack.tsx) - Tecnologías
5. **Testimonials**: Edita [testimonials.tsx](components/testimonials.tsx) - Feedback

### Agregar Nuevas Páginas
1. Crea carpeta en `pages/nombre/`
2. Crea archivo `index.tsx`
3. Importa `DefaultLayout`
4. Añade link en `config/site.ts`

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.2.6 | Framework React |
| React | 19.2.6 | UI Library |
| TypeScript | 5.6.3 | Type Safety |
| Tailwind CSS | 4.1.11 | Styling |
| HeroUI | 3.1.0 | Componentes UI |
| next-themes | 0.4.6 | Dark Mode |
| @gravity-ui/icons | 2.18.0 | Iconos |

---

## 📋 Checklist de Características

- ✅ Diseño minimalista estilo Apple
- ✅ Tema claro/oscuro
- ✅ Completamente responsivo
- ✅ Animaciones suaves
- ✅ Componentes reutilizables
- ✅ TypeScript
- ✅ SEO optimizado
- ✅ Performance optimizado
- ✅ Accessible (a11y)
- ✅ Página de contacto con formulario
- ✅ Blog integrado
- ✅ Página CV/Experiencia
- ✅ Testimonials
- ✅ Tech Stack visual

---

## 🎯 Próximas Mejoras Sugeridas

1. **Imágenes**: Añade imágenes a `/public/images/` para projects y hero
2. **Blog dinámico**: Conecta con CMS (Contentful, Sanity, etc.)
3. **Contact Form**: Integra con API (Formspree, SendGrid, etc.)
4. **Analytics**: Añade Google Analytics
5. **Performance**: Optimiza imágenes con Next.js Image
6. **SEO**: Añade metadatos dinámicos con next-seo

---

## 📞 Soporte

Si necesitas hacer cambios o tienes preguntas sobre la estructura, revisa:
- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación HeroUI](https://heroui.com/docs)

---

**¡Tu portafolio estilo Apple está listo! 🚀**
