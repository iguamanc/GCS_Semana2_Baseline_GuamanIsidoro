# SDD – Documento de Diseño de Software  
## Sistema de Recaudación de Agua Potable  
### Versión 1.0

---

## 1. Introducción

### 1.1 Propósito
Este documento describe el diseño del sistema de recaudación de agua potable, centrado en la arquitectura, componentes principales y decisiones técnicas para la implementación de una API REST en PHP con una base de datos relacional.

### 1.2 Alcance
El diseño cubre únicamente el backend del sistema, incluyendo la API REST y la base de datos. No se contempla el diseño de interfaces gráficas.

---

## 2. Arquitectura del Sistema

### 2.1 Arquitectura General
El sistema adopta una **arquitectura en tres capas**:

1. **Capa de Presentación (Cliente)**
   - Aplicaciones web o móviles externas.
   - Consumen los servicios mediante HTTP/HTTPS.

2. **Capa de Lógica de Negocio (API REST)**
   - Implementada en PHP.
   - Gestiona las reglas de negocio, validaciones y seguridad.

3. **Capa de Datos (Base de Datos)**
   - Base de datos relacional MySQL/MariaDB.
   - Almacena información de usuarios, clientes, consumos, facturas y pagos.

---

## 3. Componentes del Sistema

### 3.1 API REST
Componente central encargado de exponer los servicios del sistema.

**Subcomponentes:**
- Controladores: gestionan las solicitudes HTTP.
- Servicios: contienen la lógica de negocio.
- Repositorios: gestionan el acceso a datos.
- Middleware: maneja autenticación y validaciones.

### 3.2 Base de Datos
Base de datos relacional que garantiza integridad y consistencia de la información.

**Entidades principales:**
- Usuario
- Cliente
- Medidor
- Lectura
- Factura
- Pago

### 3.3 Seguridad
- Autenticación basada en tokens JWT.
- Validación de roles y permisos por endpoint.

---

## 4. Diseño de la Base de Datos (Descripción)

La base de datos sigue un modelo relacional con las siguientes relaciones:

- Un cliente puede tener uno o más medidores.
- Cada medidor registra múltiples lecturas.
- Las lecturas generan facturas.
- Las facturas pueden tener uno o más pagos asociados.
- Los usuarios gestionan las operaciones del sistema.

---

## 5. Flujo General del Sistema

1. El cliente realiza una solicitud HTTP a la API.
2. El middleware valida el token JWT.
3. El controlador procesa la solicitud.
4. El servicio ejecuta la lógica de negocio.
5. El repositorio interactúa con la base de datos.
6. La API retorna la respuesta en formato JSON.

---

## 6. Decisiones Técnicas

### 6.1 Lenguaje y Plataforma
- PHP 8.x por su amplia compatibilidad y facilidad de despliegue.
- MySQL/MariaDB como sistema gestor de base de datos.

### 6.2 Estilo Arquitectónico
- Arquitectura REST para facilitar la interoperabilidad con distintos clientes.
- Separación de responsabilidades para mejorar mantenibilidad.

### 6.3 Comunicación
- Protocolo HTTP/HTTPS.
- Formato de intercambio de datos JSON.

### 6.4 Seguridad
- Uso de JWT para autenticación.
- Encriptación de contraseñas mediante algoritmos hash seguros.

---

## 7. Restricciones de Diseño

- El sistema debe ejecutarse en servidores compatibles con PHP.
- No se permite acceso directo a la base de datos desde clientes externos.
- Todas las operaciones deben realizarse a través de la API REST.

---

## 8. Conclusión
Este diseño proporciona una estructura simple, clara y escalable para el desarrollo del sistema de recaudación de agua potable, sirviendo como base para la implementación y control de cambios futuros.

---
