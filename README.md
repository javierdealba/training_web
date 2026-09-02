# training_web — prototipo de validación

Prototipo navegable (Etapa 1 del *Documento Maestro del Negocio*) del marketplace y
sistema operativo para el entrenamiento deportivo personalizado. Sirve para enseñárselo
a coaches y atletas y recoger feedback antes de construir el MVP funcional (Etapa 3).

**En vivo:** https://training-web-ffb4bpe2f8ctefge.westus2-01.azurewebsites.net

## Estado del branding

El nombre, el logo y la identidad visual **están pendientes** (decisiones 1–3 de la
sección 55 del documento). Mientras tanto:

- donde va el nombre de la plataforma dice **"Nombre genérico"**;
- donde va el logo hay un recuadro con la palabra **"logo"** (`.logo-ph` en `app.css`);
- la paleta es una **propuesta**, no una decisión.

Para cambiar los colores basta con editar las variables en
[`public/assets/css/app.css`](public/assets/css/app.css):

| Variable | Uso | Propuesta actual |
| --- | --- | --- |
| `--volt` | acento principal (botones, énfasis, métricas) | `#ccff00` |
| `--bg`, `--surface`, `--surface-2` | fondos | negros con matiz frío |
| `--run`, `--strength`, `--swim`, `--hyrox`, `--mobility` | color por disciplina | volt / naranja / cian / ámbar / violeta |

El nombre visible se cambia en `mountChrome()` de
[`public/assets/js/app.js`](public/assets/js/app.js) y en el `<title>` de cada página.

## Pantallas

| Ruta | Pantalla | Qué valida |
| --- | --- | --- |
| `/` | Landing | Posicionamiento, propuesta central, embudo Free → Plan → Coaching → Multi-Coach |
| `/onboarding` | Onboarding | Datos que alimentan el Coach Match (objetivo, disciplinas, nivel, disponibilidad) |
| `/marketplace` | Marketplace | Filtros por disciplina, nivel, modalidad y precio; % de match |
| `/coach?id=carlos` | Perfil del coach | Verificación, especialidades, resultados y niveles de servicio |
| `/dashboard` | Mi entrenamiento | Objetivo, Training Team, Training Intelligence, Athlete Passport |
| `/calendario` | Calendario integrado | Multi-Coach en una sola semana + aviso de conflicto de carga |
| `/workout` | Workout experience | Sesión con bloques, cues, video y registro de resultado + RPE |
| `/coach-dashboard` | Panel del coach | Atletas, adherencia, ingresos, programación y plantillas |

Todos los datos son simulados y viven en
[`public/assets/js/data.js`](public/assets/js/data.js); no hay backend ni base de datos
todavía. La Cosmos DB (Mongo) del grupo de recursos ya está provisionada para la Etapa 3.

## Ejecutar en local

```bash
npm start          # http://localhost:8080
```

`server.js` es un servidor estático sin dependencias: sirve `public/`, resuelve URLs
limpias (`/marketplace` → `marketplace.html`) y expone `/healthz`.

## Infraestructura

| Recurso | Valor |
| --- | --- |
| Suscripción | Latido (`da1290d6-829c-41c0-90f9-6fe4a7201a8b`) |
| Grupo de recursos | `rg-training` (West US 2) |
| Web App | `training-web` — Linux, `NODE|22-lts`, plan P1v2 |
| Base de datos | `training-server` (Cosmos DB for MongoDB), aún sin usar |

## Despliegue

Automático: cada push a `main` dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que valida la sintaxis,
publica con `azure/webapps-deploy` y comprueba `/healthz`.

El workflow usa el secreto `AZURE_WEBAPP_PUBLISH_PROFILE`. Para regenerarlo:

```bash
az webapp deployment list-publishing-profiles -g rg-training -n training-web \
  --subscription Latido --xml > profile.xml
gh secret set AZURE_WEBAPP_PUBLISH_PROFILE < profile.xml
rm profile.xml
```

## Siguiente paso

Etapa 2 del documento: enseñar este prototipo a coaches, runners y atletas HYROX/híbridos
y contrastar las hipótesis 1, 2, 4 y 7 (marketplace, multi-coach, calendario integrado y
valor de la coordinación).
