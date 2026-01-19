# SRS – Especificación de Requisitos de Software  
## Sistema de Recaudación de Agua Potable (API REST y Base de Datos)

---

## 1. Introducción

### 1.1 Propósito
Este documento describe los requisitos del sistema de recaudación de agua potable, enfocado en la implementación de una **base de datos relacional** y una **API REST desarrollada en PHP**, que permita gestionar usuarios, clientes, lecturas de consumo, facturación y pagos.

### 1.2 Alcance
El sistema proveerá servicios REST para el registro, consulta y actualización de información relacionada con la recaudación del servicio de agua potable. No incluye interfaz gráfica, ya que será consumido por aplicaciones externas (web o móvil).

### 1.3 Definiciones y abreviaturas
- **API REST**: Interfaz de programación basada en servicios HTTP.
- **CRUD**: Crear, Leer, Actualizar y Eliminar.
- **JWT**: JSON Web Token para autenticación.

---

## 2. Descripción General

### 2.1 Perspectiva del producto
El sistema funcionará como un backend independiente, accesible mediante peticiones HTTP, y utilizará una base de datos MySQL para almacenar la información.

### 2.2 Usuarios del sistema
- Administrador del sistema
- Operador de recaudación
- Sistemas externos consumidores de la API

---

## 3. Requisitos Funcionales

### REQ-1 – Gestión de usuarios
El sistema deberá permitir la creación, consulta, actualización y eliminación de usuarios mediante la API REST, almacenando la información en la base de datos.

### REQ-2 – Gestión de clientes
El sistema deberá permitir registrar y administrar clientes del servicio de agua potable, incluyendo datos personales, dirección y estado del servicio.

### REQ-3 – Registro de lecturas de consumo
El sistema deberá permitir registrar lecturas periódicas de consumo de agua por cliente, asociándolas a una fecha y a un medidor específico.

### REQ-4 – Generación de facturación
El sistema deberá generar facturas automáticamente a partir de las lecturas de consumo registradas y las tarifas configuradas en la base de datos.

### REQ-5 – Registro de pagos
El sistema deberá permitir registrar pagos realizados por los clientes, actualizando el estado de la factura correspondiente.

---

## 4. Requisitos No Funcionales

### REQ-6 – Seguridad
La API REST deberá implementar autenticación mediante tokens (JWT) y proteger los endpoints para evitar accesos no autorizados.

### REQ-7 – Rendimiento
La API deberá responder a las solicitudes en un tiempo máximo de 3 segundos bajo condiciones normales de operación.

### REQ-8 – Portabilidad
El sistema deberá ser compatible con servidores web que soporten PHP 8.x y bases de datos MySQL o MariaDB.

---

## 5. Restricciones

- El desarrollo del backend deberá realizarse en PHP.
- La base de datos deberá ser relacional.
- La comunicación deberá realizarse exclusivamente mediante JSON sobre HTTP.

---

## 6. Suposiciones

- Existirá un sistema cliente que consuma la API REST.
- El servidor contará con las configuraciones necesarias para PHP y MySQL.

---

## 7. Aprobación
Este documento sirve como base para el diseño, desarrollo y validación del sistema de recaudación de agua potable.

---
