-- Insertar roles
INSERT INTO ROL (ROL) VALUES 
('Administrador'),
('Estudiante');

-- Insertar usuarios
INSERT INTO USUARIO (COD_ROL, NOMBRE, USUARIO, PASSWORD, EMAIL) VALUES
(1, 'Juan Pérez', 'juanp', 'clave123', 'juan@example.com'),
(2, 'Ana Gómez', 'anag', 'clave456', 'ana@example.com');

-- Insertar cursos
INSERT INTO CURSO (TITULO_CURSO, DESCRIPCION_CURSO) VALUES
('Curso de Introducción a la Programación', 'Aprende los fundamentos de la programación.'),
('Curso de Bases de Datos', 'Aprende sobre diseño y uso de bases de datos.');

-- Insertar usuario_curso (asignar usuarios a cursos)
INSERT INTO USUARIO_CURSO (COD_CURSO, COD_USUARIO) VALUES
(1, 1),
(1, 2),
(2, 2);

-- Insertar módulos
INSERT INTO MODULO (COD_CURSO, TITULO_MODULO, DESCRIPCION_MODULO) VALUES
(1, 'Módulo 1: Fundamentos', 'Conceptos básicos de programación.'),
(2, 'Módulo 1: SQL', 'Introducción a SQL.');

-- Insertar secciones
INSERT INTO SECCION (COD_MODULO, TITULO_SECCION, DESCRIPCION_SECCION) VALUES
(1, 'Sección 1.1: Variables', 'Tipos de datos y variables.'),
(2, 'Sección 2.1: SELECT', 'Consultas básicas con SELECT.');

-- Insertar subsecciones
INSERT INTO SUBSECCION (COD_MODULO, COD_SECCION, TITULO_SUBSECCION, DESCRIPCION_SUBSECCION) VALUES
(1, 1, 'Subsección 1.1.1: Enteros', 'Uso de números enteros.'),
(2, 1, 'Subsección 2.1.1: SELECT *', 'Uso de SELECT *.');

-- Insertar contenido
INSERT INTO CONTENIDO (COD_MODULO, COD_SECCION, COD_SUBSECCION, IMAGEN, DESCRIPCION, LINK) VALUES
(1, 1, 1, null, 'Introducción al curso', 'https://www.youtube.com/watch?v=CjmzDHMHxwU'),

-- Insertar evaluaciones
INSERT INTO EVALUACION (COD_MODULO, COD_SECCION) VALUES
(1, 1),
(2, 1);

-- Insertar problemas
INSERT INTO PROBLEMA (COD_EVALUACION, COD_MODULO, COD_SECCION, COD_SUBSECCION, TITULO_PROBLEMA, DESCRIPCION_PROBLEMA, INPUT, OUTPUT) VALUES
(1, 1, 1, 1, 'Suma de enteros', 'Sumar dos números enteros', '2 3', '5'),
(2, 2, 1, 1, 'Consulta básica', 'Seleccionar todos los registros de una tabla', 'SELECT * FROM alumnos;', 'resultado');

-- Insertar ejemplos
INSERT INTO EJEMPLOS (COD_PROBLEMA, INPUT_EJEMPLO, OUPUT_EJEMPLO) VALUES
(1, '2 3', '5'),
(2, 'SELECT * FROM alumnos;', 'resultado');

-- Insertar progreso
INSERT INTO PROGRESO (COD_CURSO, COD_USUARIO, COD_MODULO, COD_SECCION, TOTAL, TOTAL_TERMINADO) VALUES
(1, 1, 1, 1, 5, 2),
(2, 2, 2, 1, 4, 4);

-- Insertar notas
INSERT INTO NOTA (COD_PROBLEMA, COD_USUARIO, NOTA, NOTA_TOTAL) VALUES
(1, 1, 4, 5),
(2, 2, 5, 5);
