# Casos de Prueba – Sistema de Recaudación de Agua Potable  
## API REST y Base de Datos  
### Versión 1.0

---

## 1. Introducción

### 1.1 Propósito
Este documento describe los casos de prueba definidos para verificar el correcto funcionamiento de la API REST y la base de datos del sistema de recaudación de agua potable, asegurando que los requisitos especificados en el SRS se cumplan adecuadamente.

### 1.2 Alcance
Los casos de prueba cubren pruebas funcionales y no funcionales sobre los servicios REST, la seguridad y el rendimiento del sistema.

---

## 2. Consideraciones Generales

- Tipo de pruebas: Manuales
- Entorno: Servidor local o de pruebas con PHP 8.x y MySQL
- Formato de datos: JSON
- Autenticación: JWT

---

## 3. Casos de Prueba Funcionales

### CP-01 – Crear usuario
- **Requisito asociado:** REQ-1  
- **Descripción:** Verificar que la API permita registrar un nuevo usuario.
- **Precondición:** El administrador está autenticado.
- **Datos de entrada:** Datos válidos del usuario (nombre, correo, contraseña).
- **Pasos:**
  1. Enviar solicitud POST al endpoint `/usuarios`.
  2. Enviar datos en formato JSON.
- **Resultado esperado:**  
  Usuario creado correctamente y almacenado en la base de datos.
- **Estado:** Pendiente

---

### CP-02 – Registrar cliente
- **Requisito asociado:** REQ-2  
- **Descripción:** Verificar el registro de un cliente del servicio.
- **Precondición:** Usuario autenticado.
- **Datos de entrada:** Información válida del cliente.
- **Pasos:**
  1. Enviar solicitud POST al endpoint `/clientes`.
- **Resultado esperado:**  
  Cliente registrado exitosamente.
- **Estado:** Pendiente

---

### CP-03 – Registrar lectura de consumo
- **Requisito asociado:** REQ-3  
- **Descripción:** Verificar el registro de una lectura de consumo.
- **Precondición:** Cliente y medidor existentes.
- **Datos de entrada:** Valor de consumo y fecha.
- **Pasos:**
  1. Enviar solicitud POST al endpoint `/lecturas`.
- **Resultado esperado:**  
  Lectura almacenada correctamente y asociada al medidor.
- **Estado:** Pendiente

---

### CP-04 – Generar factura
- **Requisito asociado:** REQ-4  
- **Descripción:** Verificar la generación automática de una factura.
- **Precondición:** Lectura de consumo registrada.
- **Pasos:**
  1. Ejecutar el proceso de facturación.
- **Resultado esperado:**  
  Factura generada con el valor correcto.
- **Estado:** Pendiente

---

### CP-05 – Registrar pago
- **Requisito asociado:** REQ-5  
- **Descripción:** Verificar el registro de un pago de factura.
- **Precondición:** Factura pendiente de pago.
- **Datos de entrada:** Monto y método de pago.
- **Pasos:**
  1. Enviar solicitud POST al endpoint `/pagos`.
- **Resultado esperado:**  
  Pago registrado y estado de factura actualizado.
- **Estado:** Pendiente

---

## 4. Casos de Prueba No Funcionales

### CP-06 – Autenticación y seguridad
- **Requisito asociado:** REQ-6  
- **Descripción:** Verificar que los endpoints protegidos requieran autenticación.
- **Precondición:** Usuario no autenticado.
- **Pasos:**
  1. Acceder a un endpoint protegido sin token JWT.
- **Resultado esperado:**  
  Respuesta HTTP 401 (No autorizado).
- **Estado:** Pendiente

---

### CP-07 – Tiempo de respuesta
- **Requisito asociado:** REQ-7  
- **Descripción:** Verificar el tiempo de respuesta de la API.
- **Precondición:** Sistema en funcionamiento normal.
- **Pasos:**
  1. Ejecutar solicitudes concurrentes a la API.
- **Resultado esperado:**  
  Tiempo de respuesta menor o igual a 3 segundos.
- **Estado:** Pendiente

---

### CP-08 – Compatibilidad del sistema
- **Requisito asociado:** REQ-8  
- **Descripción:** Verificar la ejecución en PHP 8.x y MySQL/MariaDB.
- **Precondición:** Entorno configurado.
- **Pasos:**
  1. Desplegar la API en el servidor.
- **Resultado esperado:**  
  Sistema funcionando correctamente sin errores de compatibilidad.
- **Estado:** Pendiente

---

## 5. Criterios de Aceptación

- Todos los casos de prueba deben ejecutarse sin errores.
- Los resultados deben coincidir con los resultados esperados.
- Cualquier defecto debe ser documentado y corregido.

---

## 6. Aprobación
Este documento valida el correcto funcionamiento del sistema previo a su despliegue en producción.

---
