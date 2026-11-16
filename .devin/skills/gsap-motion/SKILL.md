---
name: gsap-motion
description: Metodología práctica de animación web con GSAP (basada en el crash course en video "GSAP tutorial" + mejores prácticas oficiales). Usar cuando se construyan o mejoren sitios con animaciones, scroll triggers, timelines, stagger o animación de texto.
---

# GSAP Motion — metodología de animación

Fuente: transcripción completa del crash course de GSAP (Adrian / tutorial) + docs oficiales GSAP. Aplicar SIEMPRE que el proyecto use GSAP.

## Setup

```js
gsap.registerPlugin(ScrollTrigger, SplitText /* si aplica */);
```

- GSAP es gratis y open source desde la adquisición de Webflow: todos los plugins (ScrollTrigger, SplitText, ScrollSmoother, DrawSVG...) están en el paquete público.
- Usar transforms (`x`, `y`, `scale`, `rotation`, `xPercent`) en vez de `top/left/width/height`. Mejor performance.
- `autoAlpha` en vez de `opacity` para fades (además aplica `visibility`).

## Los 3 métodos base + timeline

- `gsap.to(target, vars)` — anima desde el estado actual.
- `gsap.from(target, vars)` — anima DESDE los valores dados hacia el estado actual. Con múltiples `from()` sobre la misma propiedad, poner `immediateRender: false` en los siguientes.
- `gsap.fromTo(target, fromVars, toVars)` — control total de inicio y fin. Ideal para morphs (ej: `borderRadius: 0 → '100%'` convierte cuadrado en círculo).
- `gsap.timeline(vars)` — contenedor secuencial. Preferir SIEMPRE sobre `delay` encadenados. Posicionamiento: `"+=0.5"`, `"<"` (paralelo), `"label"`. Control: `play()`, `pause()`, `reverse()`, `seek()`, `progress()`.

## Stagger

Propiedad de cualquier tween/timeline:

```js
gsap.to('.item', { y: 0, stagger: 0.08 });                    // simple
gsap.to('.item', { y: 0, stagger: { amount: 0.6, from: 'center', grid: 'auto', ease: 'power2.inOut' } });
```

- `amount`: tiempo TOTAL repartido. `each`: tiempo por elemento.
- `from`: `'start' | 'end' | 'center' | índice | función` — efecto dominó o radial.
- `grid` + `axis`: stagger 2D en grillas.

## ScrollTrigger

```js
gsap.to(el, {
  x: 300,
  scrollTrigger: {
    trigger: el,
    start: 'top 80%',        // 'bottom bottom', 'top 20%'... keywords: top/center/bottom/left/right, %, px, relativo
    end: 'bottom 20%',
    scrub: true,             // ata progreso al scroll (usar ease:'none')
    // scrub: 1             // lag de 1s, más suave
    toggleActions: 'play none none reverse', // play/pause/reverse/reset discretos
    pin: true,               // fija el elemento
    pinSpacing: true,        // default true
    anticipatePin: 1,        // evita flicker en scroll rápido
    once: true,              // dispara una sola vez
  }
});
```

REGLAS DURAS:
- ScrollTrigger va en tweens de NIVEL SUPERIOR o en el timeline padre. NUNCA dentro de un tween hijo de un timeline (el playhead no puede tener dos amos).
- `scrub` y `toggleActions` son excluyentes.
- `ScrollTrigger.create({...})` para triggers standalone (contadores, estado).
- `ScrollTrigger.refresh()` tras cambios de DOM/layout que afecten posiciones.
- Crear triggers de arriba hacia abajo en la página o usar `refreshPriority`.
- Para animación de scroll compleja: construir el timeline PRIMERO sin ScrollTrigger, probarlo, y recién ahí engancharlo.

## Animación de texto

- `SplitText` (plugin oficial, gratis): `new SplitText(el, { type: 'chars,words,lines' })` → animar `.chars` con stagger. `revert()` al desmontar.
- Alternativa manual: envolver cada char en `<span>` y animar con stagger (sirve sin plugin).
- Trucos del video: efecto "scramble/typewriter" para elementos mono, reveals palabra a palabra con máscara (overflow hidden + yPercent).

## Integración frameworks

- React: `useGSAP()` de `@gsap/react` o `gsap.context()` con cleanup — revierte animaciones y ScrollTriggers al desmontar.
- Vue/Nuxt/Next: registrar plugins una vez en setup/entry; cleanup en `onUnmounted`/`useEffect return`.

## Errores comunes (del video + docs)

1. ScrollTrigger dentro de tweens anidados en timeline → no funciona.
2. `ease` en animaciones con `scrub` → movimiento artificial; usar `ease: 'none'`.
3. Animar `opacity` sin `visibility` → elementos invisibles bloquean clicks.
4. Olvidar `gsap.registerPlugin(ScrollTrigger)`.
5. Múltiples `from()` a la misma propiedad sin `immediateRender: false` → el último gana y rompe el primero.
6. No llamar `ScrollTrigger.refresh()` tras fuentes/imágenes que cambian layout.
7. `delay` encadenados en vez de timeline → imposible sincronizar y mantener.

## Ritmo y craft

- Una coreografía, no efectos sueltos: el hero es UN timeline con labels.
- `expo.out` / `power3.out` para entradas; `power1.inOut`/`none` para scrub.
- Variar densidad: secciones densas seguidas de una quieta.
- `prefers-reduced-motion`: desactivar o simplificar.
- Stagger `from: 'center'` para grids; `yPercent: 110` dentro de máscaras para slide-up de líneas.
